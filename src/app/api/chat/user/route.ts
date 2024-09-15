import { auth } from "@/auth";
import { ApiResponse } from "@/lib/response";
import { getChatUser } from "@/lib/session";
import { StatusCodes } from "http-status-codes";

export const GET = auth(async (req) => {
  const existingUser = req?.auth?.user;

  const user = await getChatUser(existingUser);

  console.log("*****************GET request user", user);

  return Response.json(
    ApiResponse.success(
      "Successfully fetched messages",
      { user },
      StatusCodes.OK,
    ),
    {
      status: 200,
      statusText: "OK",
    },
  );
});
