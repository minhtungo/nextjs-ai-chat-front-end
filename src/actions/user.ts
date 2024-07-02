"use server";

import { feedbackFormSchema } from "@/lib/definitions";
import { authedAction } from "@/lib/safe-actions";
import { sendUserFeedbackUseCase } from "@/use-cases/feedback";
import { sanitize } from "isomorphic-dompurify";

export const sendUserFeedbackAction = authedAction
  .input(feedbackFormSchema)
  .handler(async ({ input: { subject, content }, ctx: { user } }) => {
    await sendUserFeedbackUseCase({
      user,
      values: {
        subject: sanitize(subject),
        content: sanitize(content),
      },
    });

    return {
      message: "success",
    };
  });
