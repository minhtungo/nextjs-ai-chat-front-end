import { createNewChat, getChatById, getChats } from "@/data/chat";
import { Chat } from "@/types/chat";

export const createNewChatUseCase = async (chat: Chat) => {
  return await createNewChat(chat);
};

export const getChatByIDUseCase = async (chatID: string, userID: string) => {
  return await getChatById(chatID, userID);
};

export const getChatsUseCase = async (userID: string) => {
  return await getChats(userID);
};
