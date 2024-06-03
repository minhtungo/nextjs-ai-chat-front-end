"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Chat } from "@/types/chat";

export async function saveChat(chat: Chat) {
  const user = await getCurrentUser();

  if (user) {
    try {
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
              userId: user.id!,
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
              userId: user.id!,
            })),
          },
          userId: user.id!,
        },
      });
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  } else {
    console.error("User not authenticated");
    return;
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

export async function getChats(userId?: string | null) {
  if (!userId) {
    return [];
  }

  try {
    const chats = await db.chat.findMany({
      where: { userId: "clwys0n300000ip1dyr672p6e" },
      include: {
        messages: true,
      },
    });

    return chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
}
