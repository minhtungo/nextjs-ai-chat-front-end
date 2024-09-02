import dayjs from "@/lib/dayjs";
import { ACCOUNT_URLS } from "@/lib/routes";
import { AccessToken } from "@/types/api";
import { ChatListItem } from "@/types/chat";
import { type ClassValue, clsx } from "clsx";
import jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { SUBJECTS } from "./constant";
import { env } from "@/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  12,
); // 12-character random string

export const formatDate = (date: Date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${month} ${day}, ${year} ${formattedHours}:${minutes}${ampm}`;
};

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

export const encodeImage = async (file?: File) => {
  if (!file) return null;

  const encoded = await file
    .arrayBuffer()
    .then((buffer) => Buffer.from(buffer).toString("base64"));

  return encoded;
};

export function getSubjectLabelFromValue(value: string): string {
  const subject = SUBJECTS.find((subject) => subject.value === value);
  return subject ? subject.label : value; // Fallback to value if label not found
}

export const generateBreadcrumbs = (pathname: string) => {
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { title: string; href: string }[] = [];

  let currentPath = "";
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const match = ACCOUNT_URLS.find((link) => link.href === currentPath);
    if (match) {
      breadcrumbs.push({
        title: match.title,
        href: currentPath,
      });
    }
  });

  return breadcrumbs;
};

export const encodeToken = (data: AccessToken) => {
  return jwt.sign(data, env.JWT_SECRET!, {
    algorithm: "HS256",
  });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET!, {
    algorithms: ["HS256"],
  });
};

export const createToken = (data: any) => {
  return {
    jti: uuid(),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    ...data,
  };
};

export const parseMessages = (data: string[]) => {
  return data.map((message) => {
    return {
      content: message[0],
      timestamp: message[1],
      userId: message[2],
    };
  });
};

export const toMask = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const size = {
    x: canvas.width,
    y: canvas.height,
  };
  const imageData = ctx?.getImageData(0, 0, size.x, size.y) as any;
  const origData = Uint8ClampedArray.from(imageData.data);
  if (imageData) {
    for (var i = 0; i < imageData?.data.length; i += 4) {
      const pixelColor =
        imageData.data[i] === 255 ? [255, 255, 255] : [0, 0, 0];
      imageData.data[i] = pixelColor[0];
      imageData.data[i + 1] = pixelColor[1];
      imageData.data[i + 2] = pixelColor[2];
      imageData.data[i + 3] = 255;
    }
    ctx?.putImageData(imageData, 0, 0);
  }

  const dataUrl = canvas.toDataURL();
  for (var i = 0; i < imageData?.data.length; i++) {
    imageData.data[i] = origData[i];
  }

  ctx.putImageData(imageData, 0, 0);

  return dataUrl;
};

export const hexToRgb = (color: string) => {
  var parts = color.replace("#", "").match(/.{1,2}/g) as any;
  return parts.map((part: string) => parseInt(part, 16));
};

export const match = <T extends string | number | symbol, V>(
  value: T,
  handlers: { [key in T]: V },
): V => {
  const handler = handlers[value];
  return handler;
};

export const getImageDimensions = (file: File) => {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(file);
  });
};

export const clearCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement | undefined>,
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * @name createStepSchema
 * @description Create a schema for a multi-step form
 * @param steps
 */
export function createStepSchema<T extends Record<string, z.ZodType>>(
  steps: T,
) {
  return z.object(steps);
}

type MetadataProps = {
  title?: string;
  description?: string;
  canonical: string;
  ogImage?: string;
};

const defaultMetadata = {
  title: "Lumi - AI Tutor Platform",
  description:
    "Lumi is an AI tutoring platform that provides personalized and interactive learning experiences for students to enhance their learning and understanding of various subjects.",
};

export const constructMetadata = ({
  title,
  description = defaultMetadata.description,
  canonical = "/",
  ogImage = "/images/og-image.png",
}: MetadataProps) => {
  return {
    metadataBase: new URL("https://asklumi.ai/"),
    title: title ? `${title} - Lumi` : defaultMetadata.title,
    description,
    keywords: ["ai tutor", "ai"],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "OG Image",
        },
      ],
    },
    // --- will add this once we get the logo ---
    // icons: {
    //   icon: "/icon.png",
    //   shortcut: "/icon.png",
    //   apple: "/icon.png",
    // },
  };
};

export const groupChatsByDate = (
  chats: ChatListItem[],
): {
  label: string;
  chats: ChatListItem[];
}[] => {
  const groupedChats = {
    today: [] as ChatListItem[],
    yesterday: [] as ChatListItem[],
    previous7Days: [] as ChatListItem[],
    previous30Days: [] as ChatListItem[],
  };

  chats
    .toSorted((a: any, b: any) => b.last_active - a.last_active)
    .forEach((chat) => {
      const lastActiveDate = dayjs(chat.last_active * 1000); // Convert from seconds to milliseconds

      if (lastActiveDate.isToday()) {
        groupedChats.today.push(chat);
      } else if (lastActiveDate.isYesterday()) {
        groupedChats.yesterday.push(chat);
      } else if (
        lastActiveDate.isBetween(
          dayjs().subtract(7, "day"),
          dayjs(),
          null,
          "[]",
        )
      ) {
        groupedChats.previous7Days.push(chat);
      } else if (
        lastActiveDate.isBetween(
          dayjs().subtract(30, "day"),
          dayjs(),
          null,
          "[]",
        )
      ) {
        groupedChats.previous30Days.push(chat);
      }
    });

  return [
    {
      label: "Today",
      chats: groupedChats.today,
    },
    {
      label: "Yesterday",
      chats: groupedChats.yesterday,
    },
    {
      label: "Last 7 Days",
      chats: groupedChats.previous7Days,
    },
    {
      label: "Last 30 Days",
      chats: groupedChats.previous30Days,
    },
  ];
};

export const isGuestUser = (userId: string) => {
  return userId.includes("guest");
};

export const isNotUndefinedOrEmptyArray = (arr: any[]) => {
  return !(arr.length === 0 || (arr.length === 1 && arr[0] === undefined));
};
