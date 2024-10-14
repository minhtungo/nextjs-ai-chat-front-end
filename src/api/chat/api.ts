import { ChatInfoDTO, ChatListDTO, ChatMessageDTO } from "@/api/chat/dto";
import { chatUrl, MESSAGES_LIMIT } from "@/config/config";
import { chatApi } from "@/lib/api";
import { CHAT_LIST_QUERY_KEY } from "@/lib/query-keys";

const getChatInfo = async (chatId: string): Promise<ChatInfoDTO> => {
  const response = await chatApi.get(
    `/${chatUrl}/info/${chatId}?limit=${MESSAGES_LIMIT}`,
  );

  if (!response.success) {
    throw new Error(`Failed to get chat`);
  }

  return response.data.result.data;
};

const getChatList = async (): Promise<ChatListDTO[]> => {
  const response = await chatApi.get("/chat/list-rooms", {
    next: { tags: [CHAT_LIST_QUERY_KEY] },
  });

  if (!response.success) {
    throw new Error(`Failed to get chat list`);
  }

  return response.data;
};

const getChatMessages = async (
  chatId: string,
  query: string,
): Promise<ChatMessageDTO[]> => {
  const response = await chatApi.get(
    `/${chatUrl}/rooms/${chatId}/messages?${query}`,
  );

  if (!response.success) {
    throw new Error(`Failed to get messages`);
  }

  return response.data?.result?.data?.history;
};

const createChatRoom = async (title: string) => {
  const response = await chatApi.post(`/${chatUrl}/create-room`, {
    subject: "General",
    title,
  });

  if (!response.success) {
    throw new Error(`Failed to get messages`);
  }

  return response.data;
};

const updateChatInfo = async ({
  chatId,
  title,
  subject,
}: {
  chatId: string;
  title?: string;
  subject?: string;
}) => {
  const response = await chatApi.put(`/${chatUrl}/update/${chatId}`, {
    ...(title && { title }),
    ...(subject && { subject }),
  });

  if (!response.success) {
    throw new Error(`Failed to update chat`);
  }

  return response.data;
};

const deleteChats = async ({
  chats,
  deleteAll,
}: {
  chats: string[];
  deleteAll: boolean;
}) => {
  const response = await chatApi.delete(`/${chatUrl}/delete`, {
    body: {
      ...(chats.length > 0 && { rooms: chats }),
      ...(deleteAll && { deleteAll }),
    },
  });

  if (!response.success) {
    throw new Error(`Failed to delete chats`);
  }

  return response.data;
};

export default {
  getChatMessages,
  getChatInfo,
  getChatList,
  createChatRoom,
  deleteChats,
  updateChatInfo,
};
