import VerificationForm from "@/components/auth/VerificationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xác thực email",
};

const VerificationPage = () => {
  return <VerificationForm />;
};

export default VerificationPage;
