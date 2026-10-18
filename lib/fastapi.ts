import "server-only";
import { auth } from "@clerk/nextjs/server";

const apiBase = process.env.FASTAPI_INTERNAL_URL?.replace(/\/$/, "");

export class FastApiBridgeError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function fastApiRequest(path: string, init: RequestInit = {}): Promise<Response> {
  if (!apiBase || !/^https?:\/\//.test(apiBase)) {
    throw new FastApiBridgeError(503, "FastAPI server is not configured");
  }
  const { userId, getToken } = await auth();
  if (!userId) throw new FastApiBridgeError(401, "Please sign in");
  // A Clerk JWT template with audience 'chatpilot-api' must be configured.
  // Tokens remain server-side; never expose backend secrets in client bundles.
  const token = await getToken({ template: "chatpilot-api" });
  if (!token) throw new FastApiBridgeError(503, "Clerk API token template is not configured");
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (init.body != null) headers.set("Content-Type", "application/json");
  return fetch(`${apiBase}${path}`, {
    ...init,
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
}

export async function bridgeResponse(path: string, init: RequestInit = {}): Promise<Response> {
  try {
    const upstream = await fastApiRequest(path, init);
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json" },
    });
  } catch (error) {
    if (error instanceof FastApiBridgeError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    console.error("FastAPI bridge unavailable", error instanceof Error ? error.name : "Unknown error");
    return Response.json({ error: "Backend temporarily unavailable" }, { status: 502 });
  }
}
