import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
