"use server";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "doc",
  "docx",
  "pdf",
];

import { authedAction } from "@/lib/safe-actions";
import { uploadFileUseCase } from "@/use-cases/storage";
import { z } from "zod";

export const uploadFileAction = authedAction
  .input(
    z.object({
      file: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          "Only .jpg, .jpeg, .png, .webp, .doc and .pdf formats are supported.",
        ),
    }),
    {
      type: "formData",
    },
  )
  .handler(async ({ input: { file }, ctx }) => {
    return await uploadFileUseCase(file);
  });
