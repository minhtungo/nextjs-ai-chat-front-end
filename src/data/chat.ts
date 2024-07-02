import { db } from "@/lib/db";
import { Chat } from "@/types/chat";
import { cache } from "react";

export const removeChat = async (chatID: string, userId: string) => {
  await db.chat.delete({
    where: {
      id: chatID,
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

export const saveChat = cache(async (chat: Chat) => {
  const latestMessage = chat.messages[chat.messages.length - 1];
  let content;
  let image;

  if (typeof latestMessage.content === "object") {
    latestMessage.content.map((message) => {
      if (message.type === "text") {
        content = message.text.substring(0, 100);
      } else if (message.type === "image") {
        image = message.image;
      }
    });
  } else {
    content = latestMessage.content;
  }

  try {
    await db.chat.upsert({
      where: {
        id: chat.id,
        userId: chat.userId,
      },
      update: {
        messages: {
          create: {
            id: latestMessage.id,
            content: content!,
            image: image || undefined,
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
            content: content!,
            image: image || undefined,
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
    where: { id: chatID },
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
