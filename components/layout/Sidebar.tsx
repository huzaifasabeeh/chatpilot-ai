"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Plus,
  MessageSquare,
  BookOpen,
  Code2,
} from "lucide-react";
import { Trash2 } from "lucide-react";

type Chat = {
  id: string;
  title: string;
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadChats() {
    try {
      const response = await fetch("/api/chats");

      if (!response.ok) return;

      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    void fetch("/api/chats")
      .then((res) => res.ok ? res.json() : [])
      .then((data: Chat[]) => setChats(data))
      .catch((error: unknown) => console.error(error));
  }, []);

  async function createChat() {
    setLoading(true);

    try {
      const response = await fetch("/api/chats", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error();
      }

      const chat = await response.json();

      await loadChats();

      router.push(`/dashboard?chatId=${chat.id}`);

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }
  async function deleteChat(id: string) {
  try {
    const response = await fetch(`/api/chats/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error();
    }

    await loadChats();

    router.push("/dashboard");

  } catch (error) {
    console.error(error);
  }
}

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white md:flex dark:border-white/10 dark:bg-[#0c1729]">

      {/* Logo */}
      <div className="border-b border-slate-100 p-6 dark:border-white/10">
        <h1 className="text-2xl font-bold">
          🚀 ChatPilot AI
        </h1>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button
          onClick={createChat}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus size={18} />
          {loading ? "Creating..." : "New Chat"}
        </button>
      </div>

      {/* Chat History */}
      <div className="px-4">
        <h2 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
          Chats
        </h2>

        <div className="space-y-2">
          {chats.length === 0 && (
            <p className="text-sm text-gray-400">
              No chats yet
            </p>
          )}

          {chats.map((chat) => (
            <div
              key={chat.id}
              className="group flex items-center justify-between rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <Link
                href={`/dashboard?chatId=${chat.id}`}
                className="flex flex-1 items-center gap-3 px-4 py-3"
              >
                <MessageSquare size={18} />

                <span className="truncate">
                  {chat.title}
                </span>
              </Link>

              <button
                onClick={() => deleteChat(chat.id)}
                className="mr-2 hidden rounded p-1 text-red-500 hover:bg-red-100 group-hover:block"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 space-y-2 px-4">

        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
            pathname === "/dashboard"
              ? "bg-primary/10 text-primary font-semibold"
              : "hover:bg-slate-100 dark:hover:bg-white/10"
          }`}
        >
          <MessageSquare size={18} />
          Chat
        </Link>

        <Link
          href="/dashboard/knowledge"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
            pathname === "/dashboard/knowledge"
              ? "bg-primary/10 text-primary font-semibold"
              : "hover:bg-slate-100 dark:hover:bg-white/10"
          }`}
        >
          <BookOpen size={18} />
          Knowledge Base
        </Link>

        <Link
          href="/dashboard/widget"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
            pathname === "/dashboard/widget"
              ? "bg-primary/10 text-primary font-semibold"
              : "hover:bg-slate-100 dark:hover:bg-white/10"
          }`}
        >
          <Code2 size={18} />
          Widget
        </Link>

      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-100 p-4 dark:border-white/10">
        <div className="mb-4 flex justify-end">
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              My Account
            </p>

            <p className="text-xs text-muted-foreground">
              Manage Profile
            </p>
          </div>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
          />
        </div>
      </div>

    </aside>
  );
}