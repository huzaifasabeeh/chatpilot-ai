import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        widgetColor: true,
        widgetPosition: true,
        widgetTitle: true,
        widgetGreeting: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      widgetColor,
      widgetPosition,
      widgetTitle,
      widgetGreeting,
    } = await req.json();

    const user = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        widgetColor,
        widgetPosition,
        widgetTitle,
        widgetGreeting,
      },
    });

    return NextResponse.json(user);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}