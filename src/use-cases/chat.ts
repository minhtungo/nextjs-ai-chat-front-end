import "server-only";

import { getChatById, getChats, removeChat, saveChat } from "@/data/chat";
import { Chat } from "@/types/chat";

export const saveChatUseCase = async (chat: Chat, userID: string) => {
  await saveChat(chat, userID);
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
