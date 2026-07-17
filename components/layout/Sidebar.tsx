import {
  Plus,
  MessageSquare,
  User,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col bg-[#171717] text-white">
      {/* Logo */}
      <div className="border-b border-gray-800 p-6">
        <h1 className="text-2xl font-bold">
          🚀 ChatPilot AI
        </h1>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 transition hover:bg-blue-700">
          <Plus size={20} />
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 space-y-2 overflow-y-auto px-4">
        <button className="flex w-full items-center gap-3 rounded-lg p-3 transition hover:bg-gray-800">
          <MessageSquare size={18} />
          Chat 1
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg p-3 transition hover:bg-gray-800">
          <MessageSquare size={18} />
          Chat 2
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg p-3 transition hover:bg-gray-800">
          <MessageSquare size={18} />
          Chat 3
        </button>
      </div>

      {/* User */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-800 p-3">
          <User size={22} />
          <span>User</span>
        </div>
      </div>
    </aside>
  );
}