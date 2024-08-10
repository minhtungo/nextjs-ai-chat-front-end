import { createChatRoom } from "@/lib/chat";
import { fetchAuth } from "@/lib/fetch";
import { nanoid } from "@/lib/utils";
import { ChatRoom, MessageResponse } from "@/types/chat";
import { ZSAError } from "zsa";

export const createChatUseCase = async ({
  subject,
  title,
}: {
  subject: string;
  title: string;
}) => {
  try {
    const data = await createChatRoom({
      subject,
      title,
    });

    console.log("new room data", data);

    return {
      id: data.roomid,
      userId: data.uid,
      title,
      subject,
    };
  } catch (error) {
    throw new ZSAError("ERROR", "error.generalError");
  }
};

export const getChatUseCase = async ({
  chatId,
  limit = 20,
}: {
  chatId: string;
  limit?: number;
}): Promise<ChatRoom> => {
  const response = await fetchAuth({
    path: `/chat/info/${chatId}?limit=${limit}`,
  });

  if (response.error) {
    throw new Error(`Failed to get chat: ${response.error}`);
  }

  const {
    data: {
      result: { data },
    },
  } = response;

  return {
    id: chatId,
    title: data.title,
    subject: data.subject,
    messages: data.history.map((item: any) => ({
      id: nanoid(),
      content: item.message.content,
      docs: item.message.docs,
      images: item.message.images,
      timestamp: item.timestamp,
      userId: item.userid,
    })),
  };
};

export const getChatListUseCase = async (): Promise<ChatRoom[]> => {
  const response = await fetchAuth({
    path: "/chat/list-rooms",
    method: "GET",
    tags: ["get-chat-list"],
  });

  if (response.error) {
    throw new Error(`Failed to get chat: ${response.error}`);
  }

  return response.data
    .map((data: any) => ({
      id: data.id,
      userId: data.user[0],
      title: data.title,
      subject: data.subject,
      timestamp: data.timestamp,
      last_active: data.last_active,
    }))
    .toSorted((a: any, b: any) => b.last_active - a.last_active);
};

export const getMessagesUseCase = async ({
  roomId,
  query: { limit = 20, offset },
}: {
  roomId: string;
  query: { limit?: number; offset?: number };
}) => {
  const query = new URLSearchParams({
    ...(limit && { limit: limit.toString() }),
    ...(offset && { offset: offset.toString() }),
  });

  const response = await fetchAuth({
    path: `/chat/rooms/${roomId}/messages?${query.toString()}`,
    method: "GET",
  });

  if (response.error) {
    throw new Error(`Failed to get messages: ${response.error}`);
  }

  const messages = response.data.result.data.history.map(
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
  return messages;
};

export const updateChatUseCase = async ({
  roomId,
  title,
  subject,
}: {
  roomId: string;
  title?: string;
  subject?: string;
}) => {
  try {
    const response = await fetchAuth({
      path: `/chat/update/${roomId}`,
      method: "PUT",
      body: {
        ...(title && { title }),
        ...(subject && { subject }),
      },
    });

    if (response.success) {
      return response.data;
    } else if (response.error) {
      throw new ZSAError("ERROR", "Failed to update chat");
    }
  } catch (error) {
    throw new ZSAError("ERROR", "Failed to update chat");
  }
};

export const removeChatsUseCase = async ({ chats }: { chats: string[] }) => {
  const response = await fetchAuth({
    path: `/chat/delete`,
    method: "DELETE",
    body: {
      rooms: chats,
    },
  });

  if (response.success) {
    return response.data;
  }
  // else if (response.error) {
  //   throw Error(`Failed to remove chat: ${response.error}`);
  // }
};

export const getMessageImagesUseCase = async ({ url }: { url: string }) => {
  try {
    const path = new URL(url).pathname;
    const response = await fetch(`/api/chat/image?path=${path}`);

    const blob = await response.blob();

    return {
      imageSrc: URL.createObjectURL(blob),
      path,
      url,
    };
  } catch (error) {
    throw new Error("Failed to fetch image");
  }
};
