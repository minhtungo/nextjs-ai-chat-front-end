import { db } from "@/lib/db";
import { cache } from "react";

export const removeChat = async (chatID: string, userId: string) => {
  await db.chat.delete({
    where: {
      id: chatID,
      userId,
    },
  });
};

export const saveChat = cache(async (chat: any) => {
  const latestMessage = chat.messages[chat.messages.length - 1];

  try {
    const isExistingChat = await db.chat.findFirst({
      where: {
        id: chat.id,
      },
    });
    console.log(chat.id);
    console.log(isExistingChat);

    await db.chat.upsert({
      where: {
        id: chat.id,
        userId: chat.userId,
      },
      update: {
        messages: {
          create: {
            id: latestMessage.id,
            content: latestMessage.content as string,
            role: latestMessage.role,
            userId: chat.userId,
          },
        },
      },
      create: {
        id: chat.id,
        title: chat.title,
        userId: chat.userId,
        messages: {
          create: {
            id: latestMessage.id,
            content: latestMessage.content as string,
            role: latestMessage.role,
            userId: chat.userId,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error saving chat:", error);
    throw error; // Rethrow the error after logging it
  }
});

export const getChatById = async (chatID: string, userId: string) => {
  const chat = await db.chat.findFirst({
    where: { chatID },
    include: {
      messages: true,
    },
  });

  if (!chat || (userId && chat.userId !== userId)) {
    return null;
  }

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
