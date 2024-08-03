import {
  createNewChat,
  getChatById,
  getChats,
  removeAllChats,
  removeChat,
  saveChat,
} from "@/data/chat";
import { getUserById } from "@/data/user";
import { createChatRoom } from "@/lib/chat";
import { fetchAuth } from "@/lib/fetch";
import { createPayload } from "@/lib/utils";
import { Chat, NewMessage } from "@/types/chat";
import { ZSAError } from "zsa";

export const createNewChatUseCase = async (chat: Chat) => {
  const { roomid } = await createChatRoom(chat.userId);
  return await createNewChat({ ...chat, id: roomid });
};

export const saveChatUseCase = async ({
  message,
  chatId,
  userId,
  title,
}: {
  message: NewMessage;
  chatId: string;
  userId: string;
  title: string | null;
}) => {
  return await saveChat({ message, chatId, userId, title });
};

export const getChatByIDUseCase = async (chatID: string, userID: string) => {
  return await getChatById(chatID, userID);
};

export const getChatsUseCase = async (userID: string) => {
  return await getChats(userID);
};

export const removeChatUseCase = async (chatId: string, userId: string) => {
  return await removeChat(chatId, userId);
};

export const removeAllChatsUseCase = async (userID: string) => {
  const existingUser = await getUserById(userID);

  if (!existingUser) {
    throw new ZSAError("NOT_AUTHORIZED", "error.unauthorized");
  }

  try {
    await removeAllChats(existingUser.id);
  } catch (error) {
    throw new ZSAError("ERROR", "error.generalError");
  }
};

// new
export const loadMessagesUseCase = async ({
  userId,
  roomId,
  query: { limit = 10, offset },
}: {
  userId: string;
  roomId: string;
  query: { limit?: number; offset: number };
}) => {
  try {
    return await fetchAuth({
      url: `/chat/rooms/${roomId}/messages?limit=${limit}&offset=${offset}`,
      method: "GET",
      payload: createPayload({
        uid: userId,
      }),
    });
  } catch (error) {
    throw new ZSAError("ERROR", "error.generalError");
  }
};
