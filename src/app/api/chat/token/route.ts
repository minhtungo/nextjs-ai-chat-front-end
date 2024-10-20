import { auth } from "@/auth";
import { cookie } from "@/config/config";
import { ApiResponse } from "@/lib/response";
import { createGuestUserId, encodeToken } from "@/lib/utils";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";

export const GET = auth(async (req) => {
  const existingUser = req?.auth?.user;

  const id =
    existingUser?.id ||
    cookies().get(cookie.chat.userId)?.value ||
    createGuestUserId();

  const token =
    cookies().get(cookie.chat.token)?.value ||
    encodeToken({
      uid: id,
    });

  if (!cookies().get(cookie.chat.token)?.value) {
    cookies().set(cookie.chat.token, token, {
      httpOnly: true,
      maxAge: cookie.chat.expires,
    });
  }

  console.log("getChatUserUseCase GET", {
    id,
    token,
  });

  return Response.json(
    ApiResponse.success(
      "Successfully fetched token",
      { token },
      StatusCodes.OK,
    ),
    {
      status: 200,
      statusText: "OK",
    },
  );
});
