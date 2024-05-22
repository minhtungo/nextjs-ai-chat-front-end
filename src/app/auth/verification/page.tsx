import VerificationForm from "@/components/auth/VerificationForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Xác thực email",
};

const VerificationPage = () => {
  return (
    <Suspense>
      <VerificationForm />
    </Suspense>
  );
};

export default VerificationPage;
