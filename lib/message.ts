import { db } from "@/lib/prisma";

type CreateMessageData = {
  chatId: string;
  role: "user" | "assistant";
  content: string;
};

export async function createMessage(data: CreateMessageData) {
  return await db.message.create({
    data: {
      chatId: data.chatId,
      role: data.role,
      content: data.content,
    },
  });
}

export async function getMessages(chatId: string) {
  return await db.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}