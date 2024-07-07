import { countSubjects, getTotalUsers } from "@/data/admin/user";
import { db } from "@/lib/db";

export const getTotalUsersUseCase = async () => {
  return await getTotalUsers();
};

export const countSubjectsUseCase = async () => {
  const users = await db.user.findMany({
    select: {
      subjects: true, // Assuming 'subjects' is the field name
    },
  });

  const subjectCounts = {};

  // Split the subjects string and count each subject
  users.forEach((user) => {
    const subjects = user.subjects.map((subject: string) =>
      subject.trim().toLowerCase(),
    );

    subjects.forEach((subject: any) => {
      if (subject in subjectCounts) {
        subjectCounts[subject]++;
      } else {
        subjectCounts[subject] = 1;
      }
    });
  });

  return subjectCounts;
};
