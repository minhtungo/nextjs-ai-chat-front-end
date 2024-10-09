import { createChatRoom } from "@/lib/chat";

import { cookie, MESSAGES_LIMIT } from "@/config/config";
import { getCurrentUser } from "@/lib/auth";
import { Message } from "@/lib/definitions";
import { CHAT_LIST_QUERY_KEY } from "@/lib/query-keys";
import {
  createGuestUserId,
  createToken,
  encodeToken,
  nanoid,
} from "@/lib/utils";
import { ChatListItem, ChatRoom, MessageResponse } from "@/features/chat/types";
import { cookies } from "next/headers";
import { ZSAError } from "zsa";
import { chatApi } from "@/lib/api";
import { ApiResponseType } from "@/lib/response";
import { toast } from "sonner";
import { env } from "@/config/env";

export const createChatUseCase = async (title: string) => {
  try {
    const data = await createChatRoom(title);

    return {
      ...data,
      id: data.roomid!,
    };
  } catch (error) {
    throw new ZSAError("ERROR", "error.generalError");
  }
};

// export const getChatUserUseCase = async () => {
//   const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/chat/token`);
//   const data = (await response.json()) as ApiResponseType;

//   console.log("getChatUserUseCase function", data);

//   if (data.success) {
//     return data.data;
//   } else {
//     toast.error("Error getting chat messages");
//   }
// };

export const getChatUserUseCase = async () => {
  const existingUser = await getCurrentUser();

  const id =
    existingUser?.id ||
    cookies().get(cookie.chat.userId)?.value ||
    createGuestUserId();

  const token =
    cookies().get(cookie.chat.token)?.value ||
    encodeToken(
      createToken({
        uid: id,
      }),
    );

  console.log("getChatUserUseCase", {
    id,
    token,
  });

  return {
    user: existingUser || { id },
    token,
  };
};

export const getChatInfoUseCase = async (
  chatId?: string,
): Promise<ChatRoom | undefined> => {
  console.log("-----------ChatInfo useCase Called");
  if (!chatId) return;

  const response = await chatApi.get(
    `/chat/info/${chatId}?limit=${MESSAGES_LIMIT}`,
  );

  if (!response.success) {
    throw new Error(`Failed to get chat`);
  }

  const {
    data: {
      result: { data },
    },
  } = response;

  const chat = {
    id: chatId,
    title: data.title,
    subject: data.subject,
    messages: data.history.map((item: any) => ({
      id: nanoid(),
      content: item.message.content,
      docs: item.message.docs,
      images: item.message.images,
      timestamp: item.timestamp,
      userId: item.userid,
    })),
  };

  return chat;
};

export const getChatListUseCase = async (): Promise<ChatListItem[]> => {
  const response = await chatApi.get("/chat/list-rooms", {
    next: { tags: [CHAT_LIST_QUERY_KEY] },
  });

  if (!response.success) {
    return [];
  }

  return response.data
    .map((data: any) => ({
      id: data.id,
      userId: data.user[0],
      title: data.title,
      subject: data.subject,
      timestamp: data.timestamp,
      last_active: data.last_active,
    }))
    .toSorted((a: any, b: any) => b.last_active - a.last_active);
};

export const getMessagesUseCase = async ({
  chatId,
  query: { offset },
}: {
  chatId?: string;
  query: { offset?: number };
}) => {
  console.log("-----------getMessagesUseCase Called");

  const query = new URLSearchParams({
    limit: MESSAGES_LIMIT.toString(),
    ...(offset && { offset: offset.toString() }),
  });

  const response = await chatApi.get(
    `/chat/rooms/${chatId}/messages?${query.toString()}`,
  );

  if (!response.success) {
    throw new Error(`Failed to get messages`);
  }

  const messages: Message[] = response?.data?.result?.data?.history
    .toReversed()
    .map((item: MessageResponse) => ({
      id: nanoid(),
      content: item.message.content,
      docs: item.message.docs?.map((doc) => ({
        name: doc.name,
        type: doc.type,
        url: doc.url,
      })),
      images: item.message.images?.map((image) => ({
        name: image.name,
        type: image.type,
        url: image.url,
        thumbnail: image.thumbnail,
        originalWidth: image?.originalWidth,
        originalHeight: image?.originalHeight,
      })),
      timestamp: item.timestamp,
      userId: item.userid,
    }));

  return messages;
};

export const updateChatUseCase = async ({
  chatId,
  title,
  subject,
}: {
  chatId: string;
  title?: string;
  subject?: string;
}) => {
  const response = await chatApi.put(`/chat/update/${chatId}`, {
    ...(title && { title }),
    ...(subject && { subject }),
  });

  if (response.success) {
    return response.data;
  } else {
    throw new Error("Failed to update chat");
  }
};

export const removeChatsUseCase = async ({
  chats,
  deleteAll,
}: {
  chats: string[];
  deleteAll: boolean;
}) => {
  const response = await chatApi.delete(`/chat/delete`, {
    body: {
      ...(chats.length > 0 && { rooms: chats }),
      ...(deleteAll && { deleteAll }),
    },
  });

  if (response.success) {
    return response.data;
  } else {
    throw Error(`Failed to remove chat`);
  }
};
