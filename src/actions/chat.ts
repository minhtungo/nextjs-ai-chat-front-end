"use server";

import { chatUrl } from "@/app-config";
import { CHAT_LIST_QUERY_KEY } from "@/lib/query-keys";
import { authenticatedAction, chatAction } from "@/lib/safe-actions";
import {
  createChatUseCase,
  getChatInfoUseCase,
  getChatListUseCase,
  getMessageImagesUseCase,
  getMessagesUseCase,
  removeChatsUseCase,
  updateChatUseCase,
} from "@/use-cases/chat";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ZSAError } from "zsa";

export const getChatInfoAction = authenticatedAction
  .input(
    z.object({
      chatId: z.string(),
    }),
  )
  .handler(async ({ input: { chatId }, ctx: { user } }) => {
    console.log("-----------chatInfo action Called");
    try {
      const chat = await getChatInfoUseCase({
        chatId,
      });
      return chat;
    } catch (error) {
      throw new ZSAError("ERROR", error);
    }
  });

export const getChatListAction = authenticatedAction.handler(
  async ({ ctx: { user } }) => {
    const chats = await getChatListUseCase();
    return { chats };
  },
);

export const createChatAction = chatAction.handler(async () => {
  try {
    const chat = await createChatUseCase();

    return chat;
  } catch (error) {
    throw new ZSAError("ERROR", error);
  }
});

export const getMessagesAction = chatAction
  .input(
    z.object({
      chatId: z.string().optional(),
      query: z.object({
        offset: z.number().optional(),
      }),
    }),
  )
  .handler(async ({ input: { chatId, query } }) => {
    console.log("-----------Messages Action Called");
    return await getMessagesUseCase({
      chatId,
      query,
    });
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
    revalidateTag(CHAT_LIST_QUERY_KEY);
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

export const getMessageImagesAction = authenticatedAction
  .input(
    z.object({
      url: z.string(),
    }),
  )
  .handler(async ({ input: { url } }) => {
    const image = await getMessageImagesUseCase({
      url,
    });
    return { image };
  });
