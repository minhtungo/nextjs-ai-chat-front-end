import { env } from "@/env";
import { getChatInfoQueryKey } from "@/lib/query-keys";
import { ApiResponseType } from "@/lib/response";
import { Chat } from "@/types/chat";
import { headers } from "next/headers";

export const getChatInfo = async (
  chatId?: string,
): Promise<Chat | undefined> => {
  if (!chatId) return;

  console.log("getChatInfos", chatId);

  const response = await fetch(
    `${process.env.BASE_URL ?? ""}/api/chat/${chatId}/info`,
    {
      headers: headers(),
      next: {
        tags: [getChatInfoQueryKey(chatId).toString()],
      },
    },
  );
  const data = (await response.json()) as ApiResponseType;

  return data.data.chat;
};
