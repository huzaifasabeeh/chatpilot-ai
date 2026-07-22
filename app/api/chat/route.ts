import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
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