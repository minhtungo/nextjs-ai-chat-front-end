"use server";

import { contactUsFormSchema, feedbackFormSchema } from "@/lib/definitions";
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

export const sendContactUsFormAction = authedAction
  .input(contactUsFormSchema)
  .handler(
    async ({ input: { name, email, phoneNumber, message }, ctx: { user } }) => {
      // await sendUserMailUseCase({
      //   user,
      //   values: {
      //     subject: sanitize(subject),
      //     content: sanitize(content),
      //   },
      // });

      return {
        message: "success",
      };
    },
  );
