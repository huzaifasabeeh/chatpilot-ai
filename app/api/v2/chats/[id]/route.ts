import { bridgeResponse } from "@/lib/fastapi";

type Context = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Context) {
  const { id } = await params;
  if (!/^[a-zA-Z0-9-]{1,80}$/.test(id)) return Response.json({ error: "Invalid chat ID" }, { status: 400 });
  return bridgeResponse(`/v1/chats/${id}`);
}
export async function DELETE(_req: Request, { params }: Context) {
  const { id } = await params;
  if (!/^[a-zA-Z0-9-]{1,80}$/.test(id)) return Response.json({ error: "Invalid chat ID" }, { status: 400 });
  return bridgeResponse(`/v1/chats/${id}`, { method: "DELETE" });
}
