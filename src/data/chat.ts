import { db } from "@/lib/db";
import { Chat } from "@/types/chat";

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
