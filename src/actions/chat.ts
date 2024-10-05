"use server";

import { chatUrl } from "@/config/config";
import { CHAT_LIST_QUERY_KEY } from "@/lib/query-keys";
import { authenticatedAction, chatAction } from "@/lib/safe-actions";
import {
  createChatUseCase,
  removeChatsUseCase,
  updateChatUseCase,
} from "@/use-cases/chat";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ZSAError } from "zsa";

export const createChatAction = chatAction
  .input(z.string())
  .handler(async ({ input: title }) => {
    try {
      const chat = await createChatUseCase(title);

      return chat;
    } catch (error) {
      throw new ZSAError("ERROR", error);
    }
  });

export const updateChatAction = authenticatedAction
  .input(
    z.object({
      chatId: z.string(),
      title: z.string().optional(),
      subject: z.string().optional(),
    }),
  )
  .handler(async ({ input: { chatId, title, subject }, ctx: { user } }) => {
    await updateChatUseCase({
      chatId,
      title,
      subject,
    });
  });

export const removeChatsAction = authenticatedAction
  .input(
    z.object({
      chats: z.array(z.string()).default([]),
      deleteAll: z.boolean().default(false),
      currentChatId: z.string().optional(),
    }),
  )
  .handler(async ({ input: { chats, deleteAll, currentChatId } }) => {
    await removeChatsUseCase({
      chats,
      deleteAll,
    });
    revalidateTag(CHAT_LIST_QUERY_KEY);
    if (currentChatId && currentChatId === chats[0]) {
      redirect(chatUrl);
    }
  });
