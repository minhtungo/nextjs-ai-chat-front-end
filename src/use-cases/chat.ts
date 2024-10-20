import ChatApi from "@/api/chat/api";
import {
  dtoToChatInfo,
  dtoToChatList,
  dtoToChatMessages,
} from "@/api/chat/transform";
import { cookie, MESSAGES_LIMIT } from "@/config/config";
import { env } from "@/config/env";
import { ChatInfo, ChatList } from "@/domain/chat";
import { getCurrentUser } from "@/lib/auth";
import { createGuestUserId, decodeToken, encodeToken } from "@/lib/utils";
import { cookies, headers } from "next/headers";

export const createChatUseCase = async (title: string) => {
  const data = await ChatApi.createChatRoom(title);

  return {
    ...data,
    id: data.roomid!,
  };
};

// export const getChatUserUseCase = async () => {
//   const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/chat/token`);
//   const data = (await response.json()) as ApiResponseType;

//   console.log("getChatUserUseCase function", data);

//   if (data.success) {
//     return data.data;
//   } else {
//     toast.error("Error getting chat messages");
//   }
// };

export const getChatUserUseCase = async () => {
  const existingUser = await getCurrentUser();

  const id =
    existingUser?.id ||
    cookies().get(cookie.chat.userId)?.value ||
    createGuestUserId();

  const currentChatToken =
    cookies().get(cookie.chat.token)?.value &&
    decodeToken(cookies().get(cookie.chat.token)?.value!);

  const isValidToken = currentChatToken?.uid === id;

  console.log(isValidToken, "isValidToken");

  const token = isValidToken
    ? cookies().get(cookie.chat.token)?.value
    : encodeToken({ uid: id });

  console.log("getChatUserToken", id, token);

  return {
    user: existingUser || { id },
    token,
  };
};

export const getChatInfoUseCase = async (
  chatId?: string,
): Promise<ChatInfo | undefined> => {
  if (!chatId) return;

  const chatInfoDTO = await ChatApi.getChatInfo(chatId);

  return dtoToChatInfo(chatInfoDTO);
};

export const getChatListUseCase = async (): Promise<ChatList[]> => {
  const chatListDTO = await ChatApi.getChatList();

  return dtoToChatList(chatListDTO).toSorted(
    (a: any, b: any) => b.last_active - a.last_active,
  );
};

export const getChatMessagesUseCase = async ({
  chatId,
  query: { offset },
}: {
  chatId?: string;
  query: { offset?: number };
}) => {
  console.log("-----------getMessagesUseCase Called");

  const query = new URLSearchParams({
    limit: MESSAGES_LIMIT.toString(),
    ...(offset && { offset: offset.toString() }),
  });

  const chatMessagesDTO = await ChatApi.getChatMessages(
    chatId!,
    query.toString(),
  );

  return dtoToChatMessages(chatMessagesDTO).toReversed();
};

export const updateChatUseCase = async ({
  chatId,
  title,
  subject,
}: {
  chatId: string;
  title?: string;
  subject?: string;
}) => {
  const data = await ChatApi.updateChatInfo({
    chatId,
    title,
    subject,
  });

  return data;
};

export const removeChatsUseCase = async ({
  chats,
  deleteAll,
}: {
  chats: string[];
  deleteAll: boolean;
}) => {
  const data = await ChatApi.deleteChats({
    chats,
    deleteAll,
  });

  return data;
};

export const getChatTokenUseCase = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/chat/token`, {
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error("Failed to get chat token");
  }

  const { data } = await response.json();

  return data.token as string;
};
