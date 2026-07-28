"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function WidgetPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user" as const,
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/widget/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
        clerkId: "YOUR_CLERK_USER_ID",
        messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error();
      }

      const decoder = new TextDecoder();

      let assistant = "";

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "",
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        assistant += decoder.decode(value);

        setMessages([
          ...updatedMessages,
          {
            role: "assistant",
            content: assistant,
          },
        ]);
      }

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="flex h-screen flex-col bg-white">

      <div className="bg-blue-600 p-4 font-bold text-white">
        ChatPilot AI
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rounded-xl p-3 ${
              msg.role === "assistant"
                ? "bg-gray-100"
                : "ml-auto bg-blue-600 text-white"
            } max-w-[80%]`}
          >
            {msg.content}
          </div>
        ))}

      </div>

      <div className="border-t p-3">

        <div className="flex gap-2">

          <input
            className="flex-1 rounded-xl border p-3"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            className="rounded-xl bg-blue-600 px-5 text-white"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}