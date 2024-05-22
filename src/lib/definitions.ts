import { object, string, optional, boolean } from "zod";
import { passwordRegex } from "./regex";

export const signInSchema = object({
  email: string({ required_error: "Email không được để trống" })
    .min(1, "Email không được để trống")
    .email({ message: "Email không hợp lệ" }),
  password: string({ required_error: "Mật khẩu không được để trống" }).min(
    1,
    "Mật khẩu không được để trống",
  ),
  code: optional(string()),
});

export const signUpSchema = object({
  email: string({ required_error: "Email không được để trống" })
    .min(1, "Email không được để trống")
    .email({ message: "Email không hợp lệ" }),
  password: string({ required_error: "Mật khẩu không được để trống" })
    .min(8, "Mật khẩu cần có ít nhất 8 kí tự")
    .max(64, "Mật khẩu có tối đa 64 kí tự")
    .regex(
      passwordRegex,
      "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 kí tự đặc biệt và 1 số.",
    ),
  confirm_password: string({
    required_error: "Mật khẩu xác thực không được để trống",
  }).min(1, "Mật khẩu xác thực không được để trống"),
  name: string().min(1, "Tên không được để trống"),
}).refine((data) => data.password === data.confirm_password, {
  message: "Mật khẩu xác thực không khớp",
  path: ["confirm_password"],
});

export const forgotPasswordSchema = object({
  email: string({ required_error: "Email không được để trống" })
    .min(1, "Email không được để trống")
    .email({ message: "Email không hợp lệ" }),
});

export const resetPasswordSchema = object({
  password: string({ required_error: "Mật khẩu không được để trống" })
    .min(8, "Mật khẩu cần có ít nhất 8 kí tự")
    .max(64, "Mật khẩu có tối đa 64 kí tự")
    .regex(
      passwordRegex,
      "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 kí tự đặc biệt và 1 số.",
    ),
  confirm_password: string({
    required_error: "Mật khẩu xác thực không được để trống",
  }).min(1, "Mật khẩu xác thực không được để trống"),
}).refine((data) => data.password === data.confirm_password, {
  message: "Mật khẩu xác thực không khớp",
  path: ["confirm_password"],
});

export const updateUserProfileSchema = object({
  name: string().min(1, "Tên không được để trống"),
});

export const twoFactorToggleSchema = object({
  isTwoFactorEnabled: boolean(),
});

export const changeUserPasswordSchema = object({
  password: string({
    required_error: "Mật khẩu hiện tại không được để trống",
  }).min(1, "Mật khẩu hiện tại không được để trống"),
  newPassword: string({ required_error: "Mật khẩu mới không được để trống" })
    .min(8, "Mật khẩu cần có ít nhất 8 kí tự")
    .max(64, "Mật khẩu có tối đa 64 kí tự")
    .regex(
      passwordRegex,
      "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 kí tự đặc biệt và 1 số.",
    ),
  confirmNewPassword: string({
    required_error: "Mật khẩu xác thực không được để trống",
  }).min(1, "Mật khẩu xác thực không được để trống"),
})
  .refine((data) => data.password !== data.newPassword, {
    message: "Mật khẩu mới không được trùng mật khẩu hiện tại",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu xác thực không khớp",
    path: ["confirmNewPassword"],
  });
