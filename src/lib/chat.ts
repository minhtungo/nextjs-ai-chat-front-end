import { fetchAuth } from "@/lib/fetch";
import { createPayload } from "@/lib/utils";

export const createChatRoom = async (userId: string) => {
  const { data } = await fetchAuth({
    url: "/chat/create-room",
    method: "POST",
    payload: createPayload({
      uid: userId,
    }),
  });

  return data;
};
