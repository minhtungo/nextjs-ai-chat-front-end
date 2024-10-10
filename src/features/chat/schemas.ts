import { array, number, object, string, z } from "zod";

export const messageSchema = object({
  id: string(),
  content: string(),
  docs: array(
    object({
      name: string(),
      type: z.enum(["image", "document", "pdf"]),
      url: string().optional(),
    }),
  ),
  images: array(
    object({
      name: string(),
      type: z.enum(["image", "document", "pdf"]),
      url: string().optional(),
      thumbnail: string().optional(),
      originalWidth: number().optional(),
      originalHeight: number().optional(),
    }),
  ),
  timestamp: number(),
  userId: string(),
});

export type Message = z.infer<typeof messageSchema>;
