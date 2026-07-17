"use client";

import { useState } from "react";
import Message from "./Message";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: updatedMessages,
      }),
    });

    const data = await response.json();

    setMessages([
      ...updatedMessages,
      {
        role: "assistant",
        content: data.message,
      },
    ]);
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        {messages.map((message, index) => (
          <Message
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <input
  className="border p-2 flex-1"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
  if (e.key === "Enter" && input.trim()) {
    sendMessage();
  }
}}
  placeholder="Ask something..."
/>
        <button
          className="border px-4"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}