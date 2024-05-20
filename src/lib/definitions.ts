import { object, string } from "zod";
import { passwordRegex } from "./regex";

export const signInSchema = object({
  email: string({ required_error: "Email không được để trống" })
    .min(1, "Email không được để trống")
    .email({ message: "Email không hợp lệ" }),
  password: string({ required_error: "Mật khẩu không được để trống" }).min(
    1,
    "Mật khẩu không được để trống",
  ),
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
