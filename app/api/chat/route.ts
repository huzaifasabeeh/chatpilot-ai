import { auth } from "@clerk/nextjs/server";
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";

import { db } from "@/lib/prisma";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { messages, chatId } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 40 ||
        messages.some((m: unknown) => !m || typeof m !== "object" ||
          !("role" in m) || !("content" in m) ||
          !["user", "assistant"].includes(String(m.role)) ||
          typeof m.content !== "string" || m.content.length > 12000)) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }
    if (typeof chatId !== "string" || !chatId) {
      return Response.json({ error: "A chat ID is required" }, { status: 400 });
    }
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const systemPrompt = `
You are an AI customer support assistant.

Business Name:
${user.businessName || "Unknown Business"}

Business Information:
${user.knowledge || "No business information provided."}

Rules:
- Answer ONLY using the business information above.
- If the answer is not available, politely say:
"I don't have that information yet. Please contact the business directly."
- Never make up information.
- Be friendly and professional.
`;


const ownedChat = await db.chat.findFirst({
  where: { id: chatId, userId: user.id },
  select: { id: true },
});
if (!ownedChat) {
  return Response.json({ error: "Chat not found" }, { status: 404 });
}
if (messages.length === 1 && messages[0].role === "user") {
  await db.chat.update({
    where: { id: ownedChat.id },
    data: { title: messages[0].content.slice(0, 40) },
  });
}

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),

      system: systemPrompt,

      messages,
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error("Chat API Error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}