# ChatPilot Python backend — foundation (work in progress)

This is an incremental FastAPI rebuild. The existing Next.js frontend and its API routes remain unchanged.

## Local setup

From `backend/`:

```bash
python -m venv .venv
# Activate your virtual environment
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

The default SQLite URL is for **local development only**. Production requires Supabase/PostgreSQL connection and a proper migration strategy. Tables are NOT automatically created by the API; migrations will be added before deployment.

Configure `CLERK_ISSUER` and `CLERK_JWT_AUDIENCE` using a Clerk JWT template that actually issues an `aud` claim. The backend verifies signature, issuer, expiry and audience against Clerk's JWKS. Do **not** send keys or tokens in chat or commit them.

### Delivered in this milestone
- FastAPI foundation and basic health endpoint
- Owner-scoped chat create/list/read/delete and message create APIs
- Strict Clerk JWT verification dependency
- Explicit CORS allowlist
- Isolated `cp_*` tables (does not overwrite existing Prisma schema)

### Not yet delivered
- Actual database migrations / compatibility mapping from Prisma
- Next.js-to-FastAPI bridge and end-to-end auth flow
- LLM generation/streaming, RAG, widgets, payments and production testing

Never expose write-capable assistant message endpoints publicly without additional controls. AI replies should eventually be written **server-side** after successful LLM generation, not trusted from client-supplied roles.
