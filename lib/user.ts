import { db } from "@/lib/prisma";

type CreateUserData = {
  clerkId: string;
  email: string;
  name?: string;
  imageUrl?: string;
};

export async function createOrUpdateUser(
  data: CreateUserData
) {
  return await db.user.upsert({
    where: {
      clerkId: data.clerkId,
    },

    update: {
      email: data.email,
      name: data.name,
      imageUrl: data.imageUrl,
    },

    create: {
      clerkId: data.clerkId,
      email: data.email,
      name: data.name,
      imageUrl: data.imageUrl,
    },
  });
}