"use server";

import { removeChat } from "@/data/chat";
import { authedAction } from "@/lib/safe-actions";
import { PROTECTED_BASE_URL } from "@/lib/routes";
import {
  createNewChatUseCase,
  getChatsUseCase,
  removeChatUseCase,
  saveChatUseCase,
} from "@/use-cases/chat";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ZSAError } from "zsa";
import { revalidatePath } from "next/cache";
import { removeAllChatsUseCase } from "@/use-cases/chat";

export const getChatsAction = authedAction.handler(
  async ({ ctx: { user } }) => {
    try {
      const chats = await getChatsUseCase(user?.id!);
      return chats;
    } catch (error) {
      throw new Error("Error fetching chats");
    }
  },
);

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
  .input(z.object({ chatId: z.string() }))
  .handler(async ({ input: { chatId }, ctx: { user } }) => {
    try {
      await removeChatUseCase(chatId, user?.id!);
    } catch (error) {
      throw new Error("Error removing chat");
    }

    revalidatePath(`${PROTECTED_BASE_URL}`);
    redirect(PROTECTED_BASE_URL);
  });

export const removeAllChatsAction = authedAction.handler(
  async ({ ctx: { user } }) => {
    await removeAllChatsUseCase(user.id!);

    revalidatePath(`${PROTECTED_BASE_URL}`);

    return {
      message: "success",
    };
  },
);
