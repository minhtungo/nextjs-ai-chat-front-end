import { createNewChat, getChatById } from "@/data/chat";
import { Chat } from "@/types/chat";

export const createNewChatUseCase = async (chat: Chat) => {
  return await createNewChat(chat);
};

export const getChatByIDUseCase = async (chatID: string, userID: string) => {
  return await getChatById(chatID, userID);
};
