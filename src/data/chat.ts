import { db } from "@/lib/db";
import { Chat, Message } from "@/types/chat";

export const removeChat = async (userId: string, chatID: string) => {
  await db.chat.delete({
    where: {
      id_userId: {
        id: chatID,
        userId,
      },
    },
  });
};

export const saveChat = async (chat: any, userId: string) => {
  const latestMessage = chat.messages[chat.messages.length - 1];

  await db.chat.upsert({
    where: { id: chat.id },
    update: {
      title: chat.title,
      messages: {
        create: {
          id: latestMessage.id,
          content: latestMessage.content as string,
          role: latestMessage.role,
          userId,
        },
      },
    },
    create: {
      id: chat.id,
      title: chat.title,
      messages: {
        create: chat.messages.map((message) => ({
          id: message.id,
          content: message.content as string,
          role: message.role,
          userId,
        })),
      },
      userId,
      path: chat.path,
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
