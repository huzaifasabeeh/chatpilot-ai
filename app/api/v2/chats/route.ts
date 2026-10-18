import { bridgeResponse } from "@/lib/fastapi";

export async function GET() {
  return bridgeResponse("/v1/chats");
}
export async function POST(req: Request) {
  const body = await req.text();
  if (body.length > 4096) return Response.json({ error: "Payload too large" }, { status: 413 });
  return bridgeResponse("/v1/chats", { method: "POST", body });
}
