import { bridgeResponse } from "@/lib/fastapi";

type Context = { params: Promise<{ id: string }> };
export async function POST(req: Request, { params }: Context) {
  const { id } = await params;
  if (!/^[a-zA-Z0-9-]{1,80}$/.test(id)) return Response.json({ error: "Invalid chat ID" }, { status: 400 });
  const body = await req.text();
  if (body.length > 14000) return Response.json({ error: "Payload too large" }, { status: 413 });
  return bridgeResponse(`/v1/chats/${id}/messages`, { method: "POST", body });
}
