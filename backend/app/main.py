from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload
from .auth import current_user
from .config import settings
from .database import get_db
from .models import Chat, Message

app = FastAPI(title="ChatPilot API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=settings().origins, allow_methods=["GET", "POST", "DELETE"], allow_headers=["Authorization", "Content-Type"])

class ChatCreate(BaseModel):
    title: str = Field("New Chat", max_length=120)

class MessageCreate(BaseModel):
    content: str = Field(min_length=1, max_length=12000)
    role: str = Field(pattern="^(user|assistant)$")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/v1/chats", status_code=201)
def create_chat(body: ChatCreate, user: str = Depends(current_user), db: Session = Depends(get_db)):
    chat = Chat(owner_clerk_id=user, title=body.title)
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return {"id": chat.id, "title": chat.title}

@app.get("/v1/chats")
def list_chats(user: str = Depends(current_user), db: Session = Depends(get_db)):
    chats = db.scalars(select(Chat).where(Chat.owner_clerk_id == user).order_by(Chat.created_at.desc())).all()
    return [{"id": c.id, "title": c.title} for c in chats]

@app.get("/v1/chats/{chat_id}")
def get_chat(chat_id: str, user: str = Depends(current_user), db: Session = Depends(get_db)):
    chat = db.scalar(select(Chat).options(selectinload(Chat.messages)).where(Chat.id == chat_id, Chat.owner_clerk_id == user))
    if chat is None:
        raise HTTPException(404, "Chat not found")
    return {"id": chat.id, "title": chat.title, "messages": [{"id": m.id, "role": m.role, "content": m.content} for m in sorted(chat.messages, key=lambda x: x.created_at)]}

@app.post("/v1/chats/{chat_id}/messages", status_code=201)
def add_message(chat_id: str, body: MessageCreate, user: str = Depends(current_user), db: Session = Depends(get_db)):
    chat = db.scalar(select(Chat).where(Chat.id == chat_id, Chat.owner_clerk_id == user))
    if chat is None:
        raise HTTPException(404, "Chat not found")
    message = Message(chat_id=chat.id, role=body.role, content=body.content)
    db.add(message)
    db.commit()
    db.refresh(message)
    return {"id": message.id, "role": message.role, "content": message.content}

@app.delete("/v1/chats/{chat_id}", status_code=204)
def delete_chat(chat_id: str, user: str = Depends(current_user), db: Session = Depends(get_db)):
    chat = db.scalar(select(Chat).where(Chat.id == chat_id, Chat.owner_clerk_id == user))
    if chat is None:
        raise HTTPException(404, "Chat not found")
    db.delete(chat)
    db.commit()
