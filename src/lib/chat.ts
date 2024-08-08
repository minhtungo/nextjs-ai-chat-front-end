import { NewMessage } from "./../types/chat.d";
import { fetchAuth } from "@/lib/fetch";
import { createPayload, nanoid } from "@/lib/utils";
import { IFile } from "@/store/message";
import { CreateNewRoomResponse, MessageFile } from "@/types/chat";

export const createChatRoom = async ({
  userId,
  subject,
  title,
}: {
  userId: string;
  subject: string;
  title: string;
}): Promise<CreateNewRoomResponse> => {
  const { data } = await fetchAuth({
    url: "/chat/create-room",
    method: "POST",
    payload: createPayload({
      uid: userId,
    }),
    body: {
      subject,
      title,
    },
  });

  return data;
};

export const getMessageFiles = (files: MessageFile[]) => {
  const images = files
    .filter((file) => file.type === "image")
    .map((file) => ({
      url: file.url,
      name: file.name,
      type: file.type,
    }));

  const docs = files
    .filter((file) => file.type !== "image")
    .map((file) => ({
      url: file.url,
      name: file.name,
      type: file.type,
    }));

  return {
    images,
    docs,
  };
};

interface RoomData {
  user: string[];
  unseen: string;
  message: string;
  title: string;
  subject: string;
}

export const transformRoomData = (data: Record<string, RoomData>) => {
  return Object.entries(data)
    .map(([roomId, { user, message, title, subject }]) => ({
      id: roomId,
      userId: user[0],
      message,
      title,
      subject,
    }))
    .toReversed();
};

export const createNewMessageStore = ({
  content,
  userId,
  docs,
  images,
}: {
  content: string;
  userId: string;
  docs?: {
    url: string | undefined;
    name: string;
    type: "image" | "document" | "pdf";
  }[];
  images?: {
    url: string | undefined;
    name: string;
    type: "image" | "document" | "pdf";
  }[];
}) => {
  return {
    id: nanoid(),
    content,
    role: "user",
    userId,
    ...(docs && { docs }),
    ...(images && { images }),
    timestamp: new Date().getTime(),
  };
};
