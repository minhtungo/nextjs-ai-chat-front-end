"use server";

import { getChatById, getChats, removeChat, saveChat } from "@/data/chat";
import { authedProcedure } from "@/lib/safe-actions";
import { z } from "zod";

export const saveChatAction = authedProcedure
  .createServerAction()
  .input(
    z.object({
      chat: z.object({
        id: z.string(),
        title: z.string(),
        createdAt: z.date(),
        userId: z.string(),
        path: z.string(),
        messages: z.any(),
      }),
    }),
  )
  .handler(async ({ input: { chat }, ctx }) => {
    const { user } = ctx;
    try {
      await saveChat(chat, user?.id!);
    } catch (error) {
      throw new Error("Error saving chat");
    }
  });

export const getChatAction = authedProcedure
  .createServerAction()
  .input(
    z.object({
      chatID: z.string(),
    }),
  )
  .handler(async ({ input: { chatID }, ctx: { user } }) => {
    try {
      const chat = await getChatById(chatID, user?.id!);
      return chat;
    } catch (error) {
      throw new Error("Error fetching chat");
    }
  });

export const getChatsAction = authedProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { user } = ctx;

    try {
      const chats = await getChats(user?.id!);
      return chats;
    } catch (error) {
      throw new Error("Error fetching chats");
    }
  });

export const removeChatAction = authedProcedure
  .createServerAction()
  .input(z.object({ chatID: z.string() }))
  .handler(async ({ input: { chatID }, ctx }) => {
    const { user } = ctx;

    try {
      await removeChat(user?.id!, chatID);
    } catch (error) {
      throw new Error("Error removing chat");
    }

    return chatID;
  });
