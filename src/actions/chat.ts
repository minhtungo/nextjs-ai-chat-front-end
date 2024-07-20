"use server";

import { removeChat } from "@/data/chat";
import { authedAction } from "@/lib/safe-actions";
import { PROTECTED_BASE_URL } from "@/lib/routes";
import { createNewChatUseCase, saveChatUseCase } from "@/use-cases/chat";
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

export const saveChatAction = authedAction
  .input(
    z.object({
      message: z.any(),
      chatId: z.string(),
    }),
  )
  .handler(async ({ input: { message, chatId }, ctx: { user } }) => {
    try {
      await saveChatUseCase({
        message,
        chatId,
        userId: user.id!,
      });
    } catch (error) {
      throw new Error("Error saving chat");
    }
  });

export const removeChatAction = authedAction
  .input(z.object({ chatID: z.string() }))
  .handler(async ({ input: { chatID }, ctx: { user } }) => {
    try {
      await removeChat(chatID, user?.id!);
    } catch (error) {
      throw new Error("Error removing chat");
    }

    return chatID;
  });
