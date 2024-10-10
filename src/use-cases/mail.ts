import { createUserMail } from "@/data/mail";
import { feedbackFormSchema } from "@/features/feedback/schemas";
import { sendUserFeedbackEmail } from "@/lib/mail";
import { User } from "next-auth";
import { z } from "zod";
import { ZSAError } from "zsa";

export const sendUserMailUseCase = async ({
  user,
  values,
}: {
  user: User;
  values: z.infer<typeof feedbackFormSchema>;
}) => {
  const { subject, content } = values;

  try {
    await createUserMail({
      userId: user.id!,
      name: user.name!,
      email: user.email!,
      subject,
      content,
    });

    await sendUserFeedbackEmail({
      userEmail: user.email!,
      userName: user.name!,
      subject,
      content,
    });
  } catch (error) {
    throw new ZSAError("ERROR", "error.submit");
  }

  return {
    message: "success",
  };
};
