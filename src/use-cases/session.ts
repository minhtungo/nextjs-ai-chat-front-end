import { env } from "@/config/env";
import { headers } from "next/headers";
import { toast } from "sonner";

// export const getChatInfoUseCase = cache(
//   async (chatId?: string): Promise<Chat | undefined> => {
//     if (!chatId) return;

//     const response = await fetch(
//       `${process.env.BASE_URL ?? ""}/api/chat/${chatId}/info`,
//       {
//         headers: headers(),
//         next: {
//           tags: [getChatInfoQueryKey(chatId).toString()],
//         },
//       },
//     );

//     const data = (await response.json()) as ApiResponseType;

//     return data.data.chat;
//   },
// );

export const getChatTokenUseCase = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/chat/token`, {
    headers: headers(),
  });

  const { data } = await response.json();

  if (!data) {
    toast.error("Error getting chat user id");
    return;
  }

  console.log("*****************getChatTokenUseCase", data);

  return data.token as string;
};
