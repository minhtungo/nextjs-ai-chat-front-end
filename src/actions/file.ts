"use server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "image",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "doc",
  "docx",
  "pdf",
];

import { authenticatedAction } from "@/lib/safe-actions";
import { uploadFileUseCase } from "@/use-cases/file";
import { z } from "zod";

export const uploadFileAction = authenticatedAction
  .input(
    z.object({
      file: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
          (file) => !ACCEPTED_TYPES.includes(file.type),
          "Only .jpg, .jpeg, .png, .webp, .docx and .pdf formats are supported.",
        ),
    }),
    {
      type: "formData",
    },
  )
  .handler(async ({ input: { file }, ctx }) => {
    console.log("--------------here");
    const response = await uploadFileUseCase(file, ctx.user.id!);
    return response;
  });
