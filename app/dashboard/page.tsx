import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";

import { createOrUpdateUser } from "@/lib/user";

import Sidebar from "@/components/layout/Sidebar";
import ChatWindow from "@/components/chatbot/ChatWindow";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    chatId?: string;
  }>;
}) {
    const { userId } = await auth();

    const { chatId } = await searchParams;

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

 const dbUser = await db.user.findUnique({
  where: {
    clerkId: userId,
  },
  include: {
    chats: true,
  },
});

const totalChats = dbUser?.chats.length ?? 0;

const knowledgeReady =
  !!dbUser?.businessName &&
  !!dbUser?.knowledge;

  return (
<main className="flex h-screen overflow-hidden bg-background text-foreground">    <Sidebar />

    <div className="flex-1 overflow-y-auto p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.firstName || "User"} 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your AI customer support from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <p className="text-sm text-gray-500">
            Total Chats
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalChats}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
  <p className="text-sm text-gray-500">
    Knowledge Base
  </p>

  <h2
    className={`mt-2 text-3xl font-bold ${
      knowledgeReady
        ? "text-green-600"
        : "text-red-500"
    }`}
  >
    {knowledgeReady ? "Ready ✅" : "Not Configured ❌"}
  </h2>
</div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <p className="text-sm text-gray-500">
            AI Status
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            Online
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <p className="text-sm text-gray-500">
            Current Plan
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Free
          </h2>
        </div>

      </div>

      {/* Chat */}
      <div className="rounded-2xl border bg-white shadow-sm">

        <div className="border-b p-5">
          <h2 className="text-xl font-semibold">
            AI Chat
          </h2>

          <p className="text-sm text-gray-500">
            Ask questions and test your chatbot.
          </p>
        </div>

        <div className="p-6">
          <ChatWindow chatId={chatId ?? null} />
        </div>

      </div>

    </div>
  </main>
);
}