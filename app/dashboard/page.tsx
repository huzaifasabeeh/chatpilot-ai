import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";

import { createOrUpdateUser } from "@/lib/user";

import Sidebar from "@/components/layout/Sidebar";
import ChatWindow from "@/components/chatbot/ChatWindow";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  // Database connection check
  await db.$queryRaw`SELECT NOW()`;

  // Automatically create/update user in database
  if (user) {
    await createOrUpdateUser({
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      imageUrl: user.imageUrl,
    });
  }

  return (
    <main className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.firstName || "User"} 👋
          </h1>

          <p className="text-gray-500">
            Start a conversation with ChatPilot AI
          </p>
        </div>

        <ChatWindow />
      </div>
    </main>
  );
}