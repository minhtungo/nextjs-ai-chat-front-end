import { db } from "@/lib/db";
import { ChatConfig } from "@/store/chat";
import { Chat, Message, NewMessage } from "@/types/chat";
import { cache } from "react";

export const createNewChat = async (chat: Chat) => {
  return await db.chat.create({
    data: {
      title: chat.title,
      userId: chat.userId,
      createdAt: chat.createdAt,
      subject: chat.subject,
    },
  });
};

export const saveChat = cache(
  async ({
    message: { content, images, files, role },
    chatId,
    userId,
  }: {
    message: NewMessage;
    chatId: string;
    userId: string;
  }) => {
    try {
      await db.chat.upsert({
        where: {
          id: chatId,
          userId: userId,
        },
        update: {
          messages: {
            create: {
              content,
              images,
              files,
              role,
              userId,
            },
          },
        },
        create: {
          userId,
          messages: {
            create: {
              content,
              images,
              files,
              role,
              userId,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error saving chat:", error);
      throw error; // Rethrow the error after logging it
    }
  },
);

export const getChatById = async (chatID: string, userId: string) => {
  const chat = await db.chat.findUnique({
    where: { id: chatID, userId },
    include: {
      messages: true,
    },
  });

  return chat;
};

export const getChats = async (userId: string) => {
  const chats = await db.chat.findMany({
    where: { userId },
    include: {
      messages: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return chats;
};

export const removeChat = async (chatId: string, userId: string) => {
  await db.chat.delete({
    where: {
      id: chatId,
      userId,
    },
  });
};

export const removeAllChats = async (userId: string) => {
  await db.chat.deleteMany({
    where: {
      userId,
    },
  });
};
