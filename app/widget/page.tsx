  "use client";

  /*
ChatPilot AI Widget
Version 1.0
*/

  import { useEffect, useRef, useState } from "react";

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
    const inputRef = useRef<HTMLInputElement>(null);

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
          // TODO: Replace with real customer Clerk ID from embed script
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
      inputRef.current?.focus();
    }

    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    return (
    <div className="flex h-screen flex-col bg-white">

      <div className="flex items-center justify-between bg-blue-600 p-4 text-white">

        <div className="font-bold">
          ChatPilot AI
        </div>

        <button
          onClick={() => {
            if (window.parent !== window) {
              window.parent.postMessage("close-chatpilot", "*");
            }
          }}
          className="rounded px-2 py-1 hover:bg-white/20"
        >
          ✕
        </button>

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

          {loading && (
            <div className="rounded-xl bg-gray-100 p-3 w-16 animate-pulse">
              ...
            </div>
          )}

        </div>

        <div className="border-t p-3">

          <div className="flex gap-2">

            <input
              ref={inputRef}
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
              disabled={loading}
              className="rounded-xl bg-blue-600 px-5 text-white disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>

          </div>

        </div>

      </div>
    );
  }