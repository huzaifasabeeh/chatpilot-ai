import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { createOrUpdateUser } from "@/lib/user";

export async function POST(req: Request) {
  const payload = await req.text();

  const headerPayload = await headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return new NextResponse(
      "Webhook secret missing",
      { status: 500 }
    );
  }

  const wh = new Webhook(webhookSecret);

  const event = (() => {
    try {
      return wh.verify(payload, svixHeaders) as {
        type: string;
        data: {
          id: string;
          email_addresses?: Array<{ email_address: string }>;
          first_name?: string | null;
          last_name?: string | null;
          image_url?: string | null;
        };
      };
    } catch {
      return null;
    }
  })();

  if (!event) {
    return new NextResponse(
      "Invalid webhook",
      { status: 400 }
    );
  }


  if (event.type === "user.created" ||
      event.type === "user.updated") {

    const user = event.data;

    await createOrUpdateUser({
      clerkId: user.id,
      email: user.email_addresses?.[0]?.email_address ?? "",
      name:
        `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
      imageUrl: user.image_url ?? undefined,
    });
  }


  return NextResponse.json({
    success: true,
  });
}