import { fetchAuth } from "@/lib/fetch";
import { nanoid } from "@/lib/utils";
import { CreateNewRoomResponse, MessageFile } from "@/types/chat";

export const createChatRoom = async ({
  subject,
  title,
}: {
  subject: string;
  title: string;
}): Promise<CreateNewRoomResponse> => {
  const { data } = await fetchAuth({
    path: "/chat/create-room",
    method: "POST",
    body: {
      subject,
      title,
    },
  });

  return data;
};

export const getMessageFiles = (files: MessageFile[]) => {
  const imagesWithPreview = files
    .filter((file) => file.type === "image")
    .map((file) => ({
      url: file.url,
      name: file.name,
      type: file.type,
      thumbnail: file.thumbnail,
      preview: file.preview,
    }));

  const images = imagesWithPreview.map(({ preview, ...file }) => file);

  const docs = files
    .filter((file) => file.type !== "image")
    .map((file) => ({
      url: file.url,
      name: file.name,
      type: file.type,
    }));

  return {
    images,
    imagesWithPreview,
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
