"use server";

import { ACCEPTED_TYPES, chatUrl, MAX_UPLOAD_FILE_SIZE } from "@/config/config";
import { CHAT_LIST_QUERY_KEY } from "@/lib/query-keys";
import { authenticatedAction, chatAction } from "@/lib/safe-actions";
import {
  createChatUseCase,
  removeChatsUseCase,
  updateChatUseCase,
} from "@/use-cases/chat";
import { uploadFileUseCase } from "@/use-cases/file";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ZSAError } from "zsa";

export const createChatAction = chatAction
  .input(z.string())
  .handler(async ({ input: title }) => {
    try {
      const chat = await createChatUseCase(title);

      return chat;
    } catch (error) {
      throw new ZSAError("ERROR", error);
    }
  });

export const updateChatAction = authenticatedAction
  .input(
    z.object({
      chatId: z.string(),
      title: z.string().optional(),
      subject: z.string().optional(),
    }),
  )
  .handler(async ({ input: { chatId, title, subject }, ctx: { user } }) => {
    await updateChatUseCase({
      chatId,
      title,
      subject,
    });
  });

// export const getChatUserAction = chatAction.handler(
//   async ({ ctx: { user: existingUser } }) => {
//     const id =
//       existingUser?.id ||
//       cookies().get(cookie.chat.userId)?.value ||
//       createGuestUserId();

//     const token =
//       cookies().get(cookie.chat.token)?.value ||
//       encodeToken(
//         createToken({
//           uid: id,
//         }),
//       );
//     console.log("getChatUserAction", {
//       id,
//       token,
//     });

//     console.log("session", cookies().get("session")?.value);
//     setChatTokenCookie(token, Date.now() + cookie.chat.expires);

//     return {
//       user: existingUser || { id },
//       token,
//     };
//   },
// );

export const removeChatsAction = authenticatedAction
  .input(
    z.object({
      chats: z.array(z.string()).default([]),
      deleteAll: z.boolean().default(false),
      currentChatId: z.string().optional(),
    }),
  )
  .handler(async ({ input: { chats, deleteAll, currentChatId } }) => {
    await removeChatsUseCase({
      chats,
      deleteAll,
    });
    revalidateTag(CHAT_LIST_QUERY_KEY);
    if (currentChatId && currentChatId === chats[0]) {
      redirect(chatUrl);
    }
  });

export const uploadFileAction = authenticatedAction
  .input(
    z
      .any()
      .refine(
        (file) => file?.size <= MAX_UPLOAD_FILE_SIZE,
        `Max file size is 5MB.`,
      )
      .refine(
        (file) => ACCEPTED_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png, .webp, .docx and .pdf formats are supported.",
      ),
  )
  .handler(async ({ input: { file }, ctx }) => {
    return await uploadFileUseCase(file);
  });
