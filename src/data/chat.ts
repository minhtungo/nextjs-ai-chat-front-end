import { db } from "@/lib/db";
import { ChatConfig } from "@/store/chat";
import { Chat } from "@/types/chat";
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
  async ({ chat, userId }: { chat: ChatConfig; userId: string }) => {
    const latestMessage = chat.messages[chat.messages.length - 1];

    try {
      await db.chat.upsert({
        where: {
          id: chat.id!,
          userId: userId,
        },
        update: {
          messages: {
            create: {
              id: latestMessage.id,
              content: latestMessage.content,
              images: latestMessage.images,
              files: latestMessage.files,
              role: latestMessage.role,
              userId: userId,
            },
          },
        },
        create: {
          id: chat.id!,
          userId,
          messages: {
            create: {
              id: latestMessage.id,
              content: latestMessage.content,
              images: latestMessage.images,
              files: latestMessage.files,
              role: latestMessage.role,
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
