"use server";

import { messageSchema } from "@/lib/definitions";
import { CHAT_LIST_QUERY_KEY } from "@/lib/queryKey";
import { PROTECTED_BASE_URL } from "@/lib/routes";
import { authedAction } from "@/lib/safe-actions";
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

export const getChatInfoAction = authedAction
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

export const getChatListAction = authedAction.handler(
  async ({ ctx: { user } }) => {
    const chats = await getChatListUseCase();
    return { chats };
  },
);

export const createChatAction = authedAction
  .input(
    z.object({
      subject: z.string(),
    }),
  )
  .handler(async ({ input: { subject }, ctx: { user } }) => {
    let chat;
    try {
      chat = await createChatUseCase({
        subject,
        title: subject,
      });

      // return {
      //   id: room.id,
      // };
    } catch (error) {
      throw new ZSAError("ERROR", error);
    }

    if (chat) {
      redirect(`${PROTECTED_BASE_URL}/chat/${chat.id}`);
    }
  });

export const getMessagesAction = authedAction
  .input(
    z.object({
      roomId: z.string(),
      query: z.object({
        offset: z.number().optional(),
      }),
    }),
  )
  .output(z.object({ messages: z.array(messageSchema) }))
  .handler(async ({ input: { roomId, query } }) => {
    console.log("-----------Messages Action Called");
    const messages = await getMessagesUseCase({
      roomId: roomId,
      query,
    });
    return messages;
  });

export const updateChatAction = authedAction
  .input(
    z.object({
      roomId: z.string(),
      title: z.string().optional(),
      subject: z.string().optional(),
    }),
  )
  .handler(async ({ input: { roomId, title, subject }, ctx: { user } }) => {
    await updateChatUseCase({
      roomId,
      title,
      subject,
    });
    revalidateTag(CHAT_LIST_QUERY_KEY);
  });

export const removeChatsAction = authedAction
  .input(
    z.object({
      chats: z.array(z.string()),
    }),
  )
  .handler(async ({ input: { chats } }) => {
    await removeChatsUseCase({
      chats,
    });
    revalidateTag(CHAT_LIST_QUERY_KEY);
    redirect(PROTECTED_BASE_URL);
  });

export const removeAllChatsAction = authedAction.handler(
  async ({ input, ctx: { user } }) => {
    try {
      // return await updateChatUseCase({
      //   userId: user.id!,
      //   roomId,
      //   title,
      //   subject,
      // });
      return {
        message: true,
      };
    } catch (error) {
      throw new Error("Error removing chat");
    }
  },
);

export const getMessageImagesAction = authedAction
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
