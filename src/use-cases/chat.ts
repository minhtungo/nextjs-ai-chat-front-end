import {
  createNewChat,
  getChatById,
  getChats,
  removeAllChats,
  removeChat,
  saveChat,
} from "@/data/chat";
import { getUserById } from "@/data/user";
import { Chat, NewMessage } from "@/types/chat";
import { ZSAError } from "zsa";

export const createNewChatUseCase = async (chat: Chat) => {
  return await createNewChat(chat);
};

export const saveChatUseCase = async ({
  message,
  chatId,
  userId,
}: {
  message: NewMessage;
  chatId: string;
  userId: string;
}) => {
  return await saveChat({ message, chatId, userId });
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
