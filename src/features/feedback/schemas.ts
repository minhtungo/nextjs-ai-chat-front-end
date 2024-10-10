import { object, string } from "zod";

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
