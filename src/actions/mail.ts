"use server";

import { feedbackFormSchema } from "@/lib/definitions";
import { authedAction } from "@/lib/safe-actions";
import { sendUserMailUseCase } from "@/use-cases/mail";
import { sanitize } from "isomorphic-dompurify";

export const sendUserMailAction = authedAction
  .input(feedbackFormSchema)
  .handler(async ({ input: { subject, content }, ctx: { user } }) => {
    await sendUserMailUseCase({
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
