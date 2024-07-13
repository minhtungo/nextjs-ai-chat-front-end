import "server-only";

import {
  getChatById,
  getChats,
  removeAllChats,
  removeChat,
  saveChat,
} from "@/data/chat";
import { Chat } from "@/types/chat";
import { getUserById } from "@/data/user";
import { ZSAError } from "zsa";

export const saveChatUseCase = async (chat: Chat, userID: string) => {
  if (chat.userId !== userID) {
    throw new Error("Unauthorized");
  }

  await saveChat(chat);
};

export const getChatByIDUseCase = async (chatID: string, userID: string) => {
  const chat = await getChatById(chatID, userID);
  return chat;
};

export const getChatsUseCase = async (userID: string) => {
  return await getChats(userID);
};

export const removeChatUseCase = async (chatID: string, userID: string) => {
  return await removeChat(chatID, userID);
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
