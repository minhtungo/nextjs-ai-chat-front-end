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
