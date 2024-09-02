import { headers } from "next/headers";
import { toast } from "sonner";
import { env } from "@/env";

export const getChatUserIdUseCase = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/chat/userId`, {
    headers: headers(),
  });

  const { data } = await response.json();

  if (!data) {
    toast.error("Error getting chat user id");
    return;
  }

  console.log("*****************getChatUserIdUseCase", data);

  return data.id as string;
};

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
