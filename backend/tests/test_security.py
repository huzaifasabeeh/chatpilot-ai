from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool
from app.main import app
from app.database import Base, get_db
from app.auth import current_user
from app import models  # noqa: F401

engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
Base.metadata.create_all(engine)

def get_test_db():
    with Session(engine) as session:
        yield session

def test_health():
    assert TestClient(app).get("/health").json() == {"status": "ok"}

def test_auth_required():
    app.dependency_overrides[get_db] = get_test_db
    try:
        response = TestClient(app).get("/v1/chats")
        assert response.status_code in (401, 503)
    finally:
        app.dependency_overrides.clear()

def test_chat_owner_isolation_and_role():
    identity = ["owner-one"]
    app.dependency_overrides[get_db] = get_test_db
    app.dependency_overrides[current_user] = lambda: identity[0]
    try:
        client = TestClient(app)
        created = client.post("/v1/chats", json={"title": "Private"}).json()
        cid = created["id"]
        assert client.post(f"/v1/chats/{cid}/messages", json={"role": "assistant", "content": "fake"}).status_code == 422
        assert client.post(f"/v1/chats/{cid}/messages", json={"role": "user", "content": "hello"}).status_code == 201
        identity[0] = "owner-two"
        assert client.get(f"/v1/chats/{cid}").status_code == 404
        assert client.delete(f"/v1/chats/{cid}").status_code == 404
        assert client.post(f"/v1/chats/{cid}/messages", json={"role": "user", "content": "hi"}).status_code == 404
        assert client.get("/v1/chats").json() == []
    finally:
        app.dependency_overrides.clear()
