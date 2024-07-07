import { db } from "@/lib/db";

export const getTotalUsers = async () => {
  return await db.user.count();
};

export const countSubjects = async () => {
  return await db.user.findMany({
    select: {
      subjects: true, // Assuming 'subjects' is the field name
    },
  });
};
