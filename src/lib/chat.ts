import { fetchAuth } from "@/lib/fetch";
import { nanoid } from "@/lib/utils";
import { CreateNewRoomResponse, MessageFile } from "@/types/chat";
import { MutableRefObject } from "react";
import convexHull from "convex-hull";

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
  console.log("getMessagesfiles", files);
  const imagesWithPreview = files
    .filter((file) => file.type === "image")
    .map((file) => ({
      url: file.url,
      name: file.name,
      type: file.type,
      thumbnail: file.thumbnail,
      preview: file.preview,
      originalWidth: file.originalWidth,
      originalHeight: file.originalHeight,
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

type ConvexHull = {
  drawingPoints: MutableRefObject<[number, number][]>;
  selectedImage: HTMLImageElement;
};

export const getConvexHull = ({ drawingPoints, selectedImage }: ConvexHull) => {
  if (drawingPoints.current.length < 3) return [];
  const originalWidth = selectedImage?.naturalWidth;
  const originalHeight = selectedImage?.naturalHeight;
  const renderedWidth = selectedImage?.width;
  const renderedHeight = selectedImage?.height;

  const scaleX = originalWidth / renderedWidth;
  const scaleY = originalHeight / renderedHeight;

  console.log("scaleX", scaleX);
  console.log("scaleY", scaleY);

  const scaledPoints = drawingPoints.current.map(([x, y]) => [
    x * scaleX,
    y * scaleY,
  ]);

  console.log("scaledPoints", scaledPoints);
  console.log("originalPoints", drawingPoints.current);

  const renderedHull = convexHull(drawingPoints.current) as Array<
    [number, number]
  >;
  const scaledHull = convexHull(scaledPoints) as Array<[number, number]>;

  console.log("test get hull", {
    renderedWidth,
    renderedHeight,
    renderedHull,
    originalWidth,
    originalHeight,
    scaledHull,
  });

  return {
    renderedWidth,
    renderedHeight,
    renderedHull,
    originalWidth,
    originalHeight,
    scaledHull,
  };
};
