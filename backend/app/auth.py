from functools import lru_cache
import jwt
from fastapi import Depends, Header, HTTPException
from jwt import PyJWKClient
from .config import settings, Settings

@lru_cache
def client(url: str) -> PyJWKClient:
    return PyJWKClient(url, timeout=5)

def current_user(authorization: str | None = Header(default=None), config: Settings = Depends(settings)) -> str:
    """Only verified Clerk JWT subjects may access owner-scoped records."""
    if not config.clerk_issuer or not config.clerk_jwt_audience:
        raise HTTPException(503, "Clerk verification not configured")
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "Bearer token required")
    token = authorization[7:].strip()
    try:
        issuer = config.clerk_issuer.rstrip("/")
        key = client(issuer + "/.well-known/jwks.json").get_signing_key_from_jwt(token)
        claims = jwt.decode(token, key.key, algorithms=["RS256"], audience=config.clerk_jwt_audience, issuer=issuer, options={"require": ["sub", "iss", "exp", "aud"]})
    except (jwt.PyJWTError, ValueError, OSError):
        raise HTTPException(401, "Invalid session token") from None
    subject = claims.get("sub")
    if not isinstance(subject, str) or not subject:
        raise HTTPException(401, "Invalid token subject")
    return subject
