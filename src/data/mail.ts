import { db } from "@/lib/db";

export const createUserMail = async ({
  userId,
  name,
  email,
  subject,
  content,
}: {
  userId: string;
  name: string;
  email: string;
  subject: string;
  content: string;
}) => {
  return await db.mail.create({
    data: {
      userId,
      name,
      email,
      subject,
      content,
    },
  });
};

export const getUserMails = async ({ userId }: { userId: string }) => {
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

  return await db.mail.findMany({});
};
