"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Chat } from "@/types/chat";

export async function saveChat(chat: Chat) {
  const user = await getCurrentUser();

  if (user) {
    try {
      await db.chat.create({
        data: {
          id: chat.id,
          title: chat.title,
          messages: {
            create: chat.messages.map((message) => ({
              id: message.id,
              content: message.content as string,
              role: message.role,
              userId: user.id!,
            })),
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return { error: "error.unauthorized" };
  }
}

export async function getChat(id: string, userId: string) {
  const chat = await db.chat.findUnique({
    where: { id, userId },
    include: {
      messages: true,
    },
  });

  if (!chat || (userId && chat.userId !== userId)) {
    return null;
  }

  return chat;
}
