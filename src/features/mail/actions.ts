"use server";

import {
  contactUsFormSchema,
  feedbackFormSchema,
} from "@/features/feedback/schemas";
import { authenticatedAction } from "@/lib/safe-actions";
import { sendUserMailUseCase } from "@/use-cases/mail";
import { sanitize } from "isomorphic-dompurify";

export const sendUserMailAction = authenticatedAction
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

export const sendContactUsFormAction = authenticatedAction
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
