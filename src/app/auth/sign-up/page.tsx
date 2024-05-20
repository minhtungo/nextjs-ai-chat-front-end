import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký",
};

export default function SignUp() {
  return <SignUpForm />;
}
