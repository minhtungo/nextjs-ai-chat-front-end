import { db } from "@/lib/db";
import { NewMessage } from "@/types/chat";
import { cache } from "react";

export const createNewChat = async ({
  userId,
  subject,
  title,
  id,
}: {
  userId: string;
  subject: string;
  title: string;
  id: string;
}) => {
  return await db.chat.create({
    data: {
      id,
      title,
      userId,
      subject,
    },
  });
};

export const saveChat = cache(
  async ({
    message: { content, files, role },
    chatId,
    userId,
    title,
  }: {
    message: NewMessage;
    chatId: string;
    userId: string;
    title: string | null;
  }) => {
    try {
      await db.chat.upsert({
        where: {
          id: chatId,
          userId: userId,
        },
        update: {
          ...(title && { title }),
          messages: {
            create: {
              content,
              files: {
                createMany: {
                  data: files.map(({ name, type, url }) => ({
                    name: name!,
                    type: type!,
                    url: url!,
                  })),
                },
              },
              role,
              userId,
            },
          },
        },
        create: {
          userId,
          ...(title && { title }),
          messages: {
            create: {
              content,
              files: {
                createMany: {
                  data: files.map(({ name, type, url }) => ({
                    name: name!,
                    type: type!,
                    url: url!,
                  })),
                },
              },
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
      messages: {
        include: {
          files: true,
        },
      },
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
