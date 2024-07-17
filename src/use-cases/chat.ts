import { createNewChat, getChatById, getChats, saveChat } from "@/data/chat";
import { Chat, NewMessage } from "@/types/chat";

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
