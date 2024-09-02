import { auth } from "@/auth";
import { getChatUserId } from "@/lib/session";
import { getTokenUseCase } from "@/use-cases/api";

export const GET = auth(async (req) => {
  const user = req?.auth?.user;

  const userId = await getChatUserId(user);
  const token = await getTokenUseCase({
    userId,
  });

  return Response.json(
    {
      data: {
        token,
      },
    },
    {
      status: 200,
      statusText: "OK",
    },
  );
});
