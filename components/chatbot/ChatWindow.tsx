"use client";

import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || isLoading) return;

    setError("");

    const userMessage: ChatMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Ensure we have a chat before sending the message
      let currentChatId = chatId;

      if (!currentChatId) {
        const chatResponse = await fetch("/api/chats", { method: "POST" });

        if (!chatResponse.ok) {
          throw new Error("Failed to create chat");
        }

        const chat = await chatResponse.json();
        currentChatId = chat.id;
        setChatId(chat.id);
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: currentChatId,
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error("No response body");
      }

      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages([...updatedMessages, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantMessage += decoder.decode(value);

        setMessages([
          ...updatedMessages,
          { role: "assistant", content: assistantMessage },
        ]);
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 h-[500px] overflow-y-auto">
      <div>
        {messages.map((message, index) => (
          <Message key={index} role={message.role} content={message.content} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div className="flex justify-start mb-4">
            <div className="bg-red-100 text-red-700 rounded-2xl px-5 py-3">
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <textarea
          className="border p-2 flex-1 resize-none rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (input.trim()) {
                sendMessage();
              }
            }
          }}
          placeholder="Ask something..."
          rows={1}
        />

        <button
          className="bg-blue-600 text-white px-5 rounded-md disabled:opacity-50"
          onClick={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}