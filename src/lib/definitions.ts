import { object, string } from "zod";

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
    .max(64, "Mật khẩu có tối đa 64 kí tự"),
  name: string().min(1, "Tên không được để trống"),
});
