import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      messages,
    });

    return Response.json({
      message: result.text,
    });

  } catch (error) {
    console.error("Chat API Error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}