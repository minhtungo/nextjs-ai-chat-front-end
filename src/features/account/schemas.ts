import { passwordRegex } from "@/lib/regex";
import { boolean, object, string, z } from "zod";

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
