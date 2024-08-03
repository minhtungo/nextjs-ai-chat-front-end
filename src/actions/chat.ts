"use server";

import { PROTECTED_BASE_URL } from "@/lib/routes";
import { authedAction } from "@/lib/safe-actions";
import {
  createNewChatUseCase,
  getChatsUseCase,
  loadMessagesUseCase,
  removeAllChatsUseCase,
  removeChatUseCase,
  saveChatUseCase,
} from "@/use-cases/chat";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ZSAError } from "zsa";

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
      title: z.string().nullable(),
    }),
  )
  .handler(async ({ input: { message, chatId, title }, ctx: { user } }) => {
    try {
      await saveChatUseCase({
        message,
        chatId,
        title,
        userId: user.id!,
      });
    } catch (error) {
      throw new Error("Error saving chat");
    }

    if (title !== null) {
      revalidatePath(`/${PROTECTED_BASE_URL}/chat/${chatId}`);
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

// new
export const loadMessagesAction = authedAction
  .input(
    z.object({
      roomId: z.string(),
      query: z.object({ limit: z.number().optional(), offset: z.number() }),
    }),
  )
  .handler(async ({ input: { roomId, query }, ctx: { user } }) => {
    const res = await loadMessagesUseCase({
      userId: user.id!,
      roomId: roomId,
      query,
    });

    return { messages: res.data.result.data.history?.toReversed() };
  });
