import { object, string, optional, boolean, z } from "zod";
import { passwordRegex } from "./regex";

export const signInSchema = object({
  email: string({ required_error: "auth.error.email" })
    .min(1, "auth.error.email")
    .email({ message: "auth.error.invalidEmail" }),
  password: string({ required_error: "auth.error.password" }).min(
    1,
    "auth.error.password",
  ),
  code: optional(string()),
});

export const signUpSchema = object({
  email: string({ required_error: "auth.error.email" })
    .min(1, "auth.error.email")
    .email({ message: "auth.error.invalidEmail" }),
  password: string({ required_error: "auth.error.password" })
    .min(8, "auth.error.minPasswordLength")
    .max(64, "auth.error.maxPasswordLength")
    .regex(passwordRegex, "auth.error.passwordInvalid"),
  confirm_password: string({
    required_error: "auth.error.confirmPassword",
  }).min(1, "auth.error.confirmPassword"),
  name: string().min(1, "auth.error.name"),
}).refine((data) => data.password === data.confirm_password, {
  message: "auth.error.confirmPasswordInvalid",
  path: ["confirm_password"],
});

export const forgotPasswordSchema = object({
  email: string({ required_error: "auth.error.email" })
    .min(1, "auth.error.email")
    .email({ message: "auth.error.invalidEmail" }),
});

export const resetPasswordSchema = object({
  password: string({ required_error: "auth.error.password" })
    .min(8, "auth.error.minPasswordLength")
    .max(64, "auth.error.maxPasswordLength")
    .regex(passwordRegex, "auth.error.passwordInvalid"),
  confirm_password: string({
    required_error: "auth.error.confirmPassword",
  }).min(1, "auth.error.confirmPassword"),
}).refine((data) => data.password === data.confirm_password, {
  message: "auth.error.confirmPasswordInvalid",
  path: ["confirm_password"],
});

export const updateUserProfileSchema = object({
  name: string().min(1, "auth.error.name"),
  image: string().optional(),
  gradeLevel: string().optional(),
  subjects: z.array(z.string()).optional(),
  language: z.enum(["vi", "en"]).default("vi"),
});

export const twoFactorToggleSchema = object({
  isTwoFactorEnabled: boolean(),
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
