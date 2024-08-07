import { fetchAuth } from "@/lib/fetch";
import { createPayload } from "@/lib/utils";
import { CreateNewRoomResponse } from "@/types/chat";

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
      subject,
      title,
    }),
  });

  return data;
};
