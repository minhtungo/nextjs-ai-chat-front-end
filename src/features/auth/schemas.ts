import { passwordRegex } from "@/lib/regex";
import { object, optional, string } from "zod";

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
