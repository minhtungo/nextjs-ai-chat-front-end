import { createNewChat, getChatById, getChats, saveChat } from "@/data/chat";
import { ChatConfig } from "@/store/chat";
import { Chat } from "@/types/chat";

export const createNewChatUseCase = async (chat: Chat) => {
  return await createNewChat(chat);
};

export const saveChatUseCase = async ({
  chat,
  userId,
}: {
  chat: ChatConfig;
  userId: string;
}) => {
  return await saveChat({ chat, userId });
};

export const getChatByIDUseCase = async (chatID: string, userID: string) => {
  return await getChatById(chatID, userID);
};

export const getChatsUseCase = async (userID: string) => {
  return await getChats(userID);
};
