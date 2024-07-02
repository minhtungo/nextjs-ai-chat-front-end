import { db } from "@/lib/db";

export const createUserFeedback = async ({
  userId,
  subject,
  content,
}: {
  userId: string;
  subject: string;
  content: string;
}) => {
  return await db.feedback.create({
    data: {
      userId,
      subject,
      content,
    },
  });
};

export const getUserFeedbacks = async ({ userId }: { userId: string }) => {
  const existingUser = await db.user.findUnique({
    where: { id: userId },
    select: {
      role: true,
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  if (existingUser.role !== "ADMIN") {
    throw new Error("User is not an admin");
  }

  return await db.feedback.findMany({});
};
