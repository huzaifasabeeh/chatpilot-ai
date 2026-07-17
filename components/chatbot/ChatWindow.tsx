"use client";

import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello 👋 Welcome to ChatPilot AI!",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "🤖 This is a dummy AI response. Real AI will be connected on Day 4.",
        },
      ]);

      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8">
        {messages.map((message, index) => (
          <Message
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Type your message..."
          />

          <button
            onClick={sendMessage}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}