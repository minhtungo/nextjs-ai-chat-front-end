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
import { createPayload, nanoid } from "@/lib/utils";
import { MessageResponse, NewMessage } from "@/types/chat";
import { ZSAError } from "zsa";

export const createNewChatUseCase = async ({
  userId,
  subject,
  title,
}: {
  userId: string;
  subject: string;
  title: string;
}) => {
  try {
    const data = await createChatRoom({
      userId: userId,
      subject: subject,
      title: title,
    });
    console.log("createroomdata", data);
    return await createNewChat({ userId, subject, title, id: data.roomid });
  } catch (error) {
    console.error("Error creating chat room:", error);
  }
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
  query: { limit = 20, offset },
}: {
  userId: string;
  roomId: string;
  query: { limit?: number; offset?: number };
}) => {
  try {
    const query = new URLSearchParams({
      ...(limit && { limit: limit.toString() }),
      ...(offset && { offset: offset.toString() }),
    });

    const response = await fetchAuth({
      url: `/chat/rooms/${roomId}/messages?${query.toString()}`,
      method: "GET",
      payload: createPayload({
        uid: userId,
      }),
    });
    const data = response.data.result.data.history.map(
      (item: MessageResponse) => {
        return {
          id: nanoid(),
          content: item.message.content,
          docs: item.message.docs?.map((doc) => {
            return {
              name: doc.name,
              type: doc.type,
              url: doc.url,
            };
          }),
          images: item.message.images?.map((image) => {
            return {
              name: image.name,
              type: image.type,
              url: image.url,
            };
          }),
          timestamp: item.timestamp,
          userId: item.userid,
        };
      },
    );
    return data;
  } catch (error) {
    throw new ZSAError("ERROR", "error.generalError");
  }
};
