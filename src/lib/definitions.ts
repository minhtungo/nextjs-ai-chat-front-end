import { createStepSchema } from "@/lib/utils";
import { array, boolean, number, object, string, z } from "zod";
import { passwordRegex } from "./regex";

export const updateUserProfileSchema = object({
  name: string().min(1, "auth.error.name"),
  image: string().optional(),
  academicLevel: string().optional(),
  subjects: z.array(z.string()).optional(),
});

export const updateUserSettingsSchema = object({
  isTwoFactorEnabled: boolean(),
  preferredLang: string().optional().default("vi"),
});

export const changeUserPasswordSchema = object({
  password: string({
    required_error: "auth.error.currentPassword",
  }).min(1, "auth.error.currentPassword"),
  newPassword: string({ required_error: "auth.error.newPassword" })
    .min(8, "auth.error.minPasswordLength")
    .max(64, "auth.error.maxPasswordLength")
    .regex(passwordRegex, "auth.error.newPasswordInvalid"),
  confirmNewPassword: string({
    required_error: "auth.error.confirmPassword",
  }).min(1, "auth.error.confirmPassword"),
})
  .refine((data) => data.password !== data.newPassword, {
    message: "auth.error.passwordDuplicated",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "auth.error.confirmPasswordInvalid",
    path: ["confirmNewPassword"],
  });

export const feedbackFormSchema = object({
  subject: string().min(1, "error.subject"),
  content: string().min(1, "error.content"),
});

export const contactUsFormSchema = object({
  name: string().min(1, "error.subject"),
  email: string({ required_error: "auth.error.email" })
    .min(1, "auth.error.email")
    .email({ message: "auth.error.invalidEmail" }),
  phoneNumber: string().min(1, "error.content"),
  message: string().min(1, "error.content"),
});

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
