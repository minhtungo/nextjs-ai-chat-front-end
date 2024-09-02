import { auth } from "@/auth";
import { getChatUserId } from "@/lib/session";

export const GET = auth(async (req) => {
  const user = req?.auth?.user;

  const userId = await getChatUserId(user);

  return Response.json(
    {
      data: {
        id: userId,
      },
    },
    {
      status: 200,
      statusText: "OK",
    },
  );
});
