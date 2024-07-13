"use server";

import { removeChat } from "@/data/chat";
import { authedAction } from "@/lib/safe-actions";
import { PROTECTED_BASE_URL } from "@/routes";
import { Chat } from "@/types/chat";
import {
  getChatByIDUseCase,
  getChatsUseCase,
  removeAllChatsUseCase,
  saveChatUseCase,
} from "@/use-cases/old/chat";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const saveChatAction = authedAction
  .input(
    z.object({
      chat: z.object({
        id: z.string(),
        title: z.string(),
        createdAt: z.date(),
        userId: z.string(),
        messages: z.any(),
      }),
    }),
  )
  .handler(async ({ input: { chat }, ctx: { user } }) => {
    try {
      await saveChatUseCase(chat as Chat, user?.id!);
    } catch (error) {
      throw new Error("Error saving chat");
    }
  });

export const getChatAction = authedAction
  .input(
    z.object({
      chatID: z.string(),
    }),
  )
  .handler(async ({ input: { chatID }, ctx: { user } }) => {
    try {
      const chat = await getChatByIDUseCase(chatID, user?.id!);
      return chat;
    } catch (error) {
      throw new Error("Error fetching chat");
    }
  });

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

export const removeAllChatsAction = authedAction.handler(
  async ({ ctx: { user } }) => {
    await removeAllChatsUseCase(user.id!);

    revalidatePath(`${PROTECTED_BASE_URL}/settings`);

    return {
      message: "success",
    };
  },
);
