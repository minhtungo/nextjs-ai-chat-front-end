"use client";

import { FC } from "react";
import FormWrapper from "./FormWrapper";

interface VerificationFormProps {}

const VerificationForm: FC<VerificationFormProps> = () => {
  return (
    <FormWrapper
      headerLabel="Xác thực email"
      backButtonHref="/sign-in"
      backButtonLabel="Đăng nhập"
    />
  );
};

export default VerificationForm;
