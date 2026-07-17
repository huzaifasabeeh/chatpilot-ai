import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";

import Sidebar from "@/components/layout/Sidebar";
import ChatWindow from "@/components/chatbot/ChatWindow";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await db.$queryRaw`SELECT NOW()`;

  return (
    <main className="flex h-screen overflow-hidden bg-gray-100">
  <Sidebar />

  <div className="flex-1">
    <ChatWindow />
  </div>
</main>
  );
}