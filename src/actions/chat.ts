"use server";

import { removeChat } from "@/data/chat";
import { authedProcedure } from "@/lib/safe-actions";
import { Chat } from "@/types/chat";
import {
  getChatByIDUseCase,
  getChatsUseCase,
  saveChatUseCase,
} from "@/use-cases/chat";
import { z } from "zod";

export const saveChatAction = authedProcedure
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

export const getChatAction = authedProcedure
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

export const getChatsAction = authedProcedure.handler(
  async ({ ctx: { user } }) => {
    try {
      const chats = await getChatsUseCase(user?.id!);
      return chats;
    } catch (error) {
      throw new Error("Error fetching chats");
    }
  },
);

export const removeChatAction = authedProcedure
  .input(z.object({ chatID: z.string() }))
  .handler(async ({ input: { chatID }, ctx: { user } }) => {
    try {
      await removeChat(chatID, user?.id!);
    } catch (error) {
      throw new Error("Error removing chat");
    }

    return chatID;
  });
