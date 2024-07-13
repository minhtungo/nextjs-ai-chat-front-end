"use server";

import { authedAction } from "@/lib/safe-actions";
import { PROTECTED_BASE_URL } from "@/routes";
import { createNewChatUseCase } from "@/use-cases/chat";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ZSAError } from "zsa";

export const createNewChatAction = authedAction
  .input(
    z.object({
      subject: z.string(),
    }),
  )
  .handler(async ({ input: { subject }, ctx: { user } }) => {
    let chat;
    try {
      chat = await createNewChatUseCase({
        subject,
        userId: user.id!,
        createdAt: new Date(),
        messages: [],
        title: "",
      });
    } catch (error) {
      throw new ZSAError("ERROR", error);
    }
    redirect(`${PROTECTED_BASE_URL}/chat/${chat.id}`);
  });
