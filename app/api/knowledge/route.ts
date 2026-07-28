import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { businessName, knowledge } = await req.json();

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

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        businessName,
        knowledge,
      },
    });

    return Response.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}