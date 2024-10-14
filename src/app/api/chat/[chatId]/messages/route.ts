import { auth } from "@/auth";
import { ApiResponse } from "@/lib/response";
import { getChatMessagesUseCase } from "@/use-cases/chat";
import { StatusCodes } from "http-status-codes";

export const GET = auth(async (req, { params }) => {
  const searchParams = req.nextUrl.searchParams;
  const offset = searchParams.get("offset");

  const user = req?.auth?.user;

  if (!user) {
    return Response.json(
      ApiResponse.failure("Unauthorized", null, StatusCodes.UNAUTHORIZED),
      {
        status: StatusCodes.UNAUTHORIZED,
        statusText: "Unauthorized",
      },
    );
  }

  const chatId = params?.chatId as string;

  if (!chatId) {
    return Response.json(
      ApiResponse.failure("ChatId is missing", null, StatusCodes.BAD_REQUEST),
      {
        status: StatusCodes.BAD_REQUEST,
        statusText: "Bad Request",
      },
    );
  }

  try {
    const messages = await getChatMessagesUseCase({
      chatId,
      query: {
        offset: offset ? parseInt(offset) : undefined,
      },
    });

    console.log("messages", messages);

    return Response.json(
      ApiResponse.success(
        "Successfully fetched messages",
        { messages },
        StatusCodes.OK,
      ),
      {
        status: StatusCodes.OK,
        statusText: "OK",
      },
    );
  } catch (error) {
    return Response.json(
      ApiResponse.failure(
        "Failed to fetch messages",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      ),
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: "Internal Server Error",
      },
    );
  }
});
