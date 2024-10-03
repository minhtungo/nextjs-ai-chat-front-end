import { createChatRoom } from "@/lib/chat";

import { MESSAGES_LIMIT } from "@/app-config";
import { fetchAuth } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { Message } from "@/lib/definitions";
import { CHAT_LIST_QUERY_KEY } from "@/lib/query-keys";
import { getChatToken, getChatUser } from "@/lib/session";
import { nanoid } from "@/lib/utils";
import { ChatListItem, ChatRoom, MessageResponse } from "@/types/chat";
import { ZSAError } from "zsa";

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

export const getChatInfoUseCase = async (chatId: string): Promise<ChatRoom> => {
  console.log("-----------ChatInfo useCase Called");
  const response = await fetchAuth({
    path: `/chat/info/${chatId}?limit=${MESSAGES_LIMIT}`,
  });

  if (!response.success) {
    throw new Error(`Failed to get chat: ${response.error}`);
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
  const response = await fetchAuth({
    path: "/chat/list-rooms",
    method: "GET",
    tags: [CHAT_LIST_QUERY_KEY],
  });

  if (!response.success) {
    throw new Error(`Failed to get chat: ${response.error}`);
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

  const response = await fetchAuth({
    path: `/chat/rooms/${chatId}/messages?${query.toString()}`,
    method: "GET",
  });

  if (!response.success) {
    throw new Error(`Failed to get messages: ${response.error}`);
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
  const response = await fetchAuth({
    path: `/chat/update/${chatId}`,
    method: "PUT",
    body: {
      ...(title && { title }),
      ...(subject && { subject }),
    },
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
  const response = await fetchAuth({
    path: `/chat/delete`,
    method: "DELETE",
    body: {
      ...(chats.length > 0 && { rooms: chats }),
      ...(deleteAll && { deleteAll }),
    },
  });

  if (response.success) {
    return response.data;
  } else if (response.error) {
    throw Error(`Failed to remove chat: ${response.error}`);
  }
};

export const getChatUserUseCase = async () => {
  const existingUser = await getCurrentUser();

  const user = getChatUser(existingUser);
  const token = getChatToken(user.id!);

  return {
    user,
    token,
  };
};
