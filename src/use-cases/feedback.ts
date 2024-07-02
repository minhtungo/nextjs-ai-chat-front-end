import { createUserFeedback } from "@/data/feedback";
import { feedbackFormSchema } from "@/lib/definitions";
import { sendUserFeedbackEmail } from "@/lib/mail";
import { authedProcedure } from "@/lib/safe-actions";
import { User } from "next-auth";
import { z } from "zod";
import { ZSAError } from "zsa";

export const sendUserFeedbackUseCase = async ({
  user,
  values,
}: {
  user: User;
  values: z.infer<typeof feedbackFormSchema>;
}) => {
  const { subject, content } = values;

  try {
    await createUserFeedback({
      userId: user.id!,
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
