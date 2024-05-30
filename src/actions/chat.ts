"use server";

import { auth } from "@/auth";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Chat, Conversation } from "@/types/chat";

export async function saveChat(chat: Chat) {
  const user = await getCurrentUser();

  if (user) {
    try {
      await db.conversation.create({
        data: {
          id: chat.id,
          title: chat.title,
          messages: {
            create: chat.messages.map((message) => ({
              id: message.id,
              content: message.content as string,
              role: message.role as string,
            })),
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (error) {}
  } else {
    return { error: "error.unauthorized" };
  }
}
