import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";

import { db } from "@/lib/prisma";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, clerkId } = await req.json();

    if (!clerkId) {
      return Response.json(
        { error: "Missing clerkId" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        clerkId,
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

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}