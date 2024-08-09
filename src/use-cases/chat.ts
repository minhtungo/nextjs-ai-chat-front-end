import { createChatRoom, transformRoomData } from "@/lib/chat";
import { fetchAuth } from "@/lib/fetch";
import { nanoid } from "@/lib/utils";
import { MessageResponse } from "@/types/chat";
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

export const getChatsUseCase = async (userId: string) => {
  const { data } = await fetchAuth({
    url: "/chat/list-rooms",
    method: "GET",
    token: {
      uid: userId,
    },
  });

  const roomData = transformRoomData(data);

  return {
    data: roomData,
  };
};

export const getMessagesUseCase = async ({
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
      token: {
        uid: userId,
      },
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

export const updateChatUseCase = async ({
  userId,
  roomId,
  title,
  subject,
}: {
  userId: string;
  roomId: string;
  title?: string;
  subject?: string;
}) => {
  try {
    const response = await fetchAuth({
      url: `/chat/update/${roomId}`,
      method: "PUT",
      token: {
        uid: userId,
      },
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

export const getMessageImagesUseCase = async ({
  userId,
  path,
}: {
  userId: string;
  path: string;
}) => {
  try {
    const response = await fetchAuth({
      baseUrl: process.env.ASSET_SERVER_URL,
      url: path,
      method: "GET",
      token: {
        uid: userId,
      },
    });
    const imageBlob = await response.data.blob();
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    console.log(error);
  }
};
