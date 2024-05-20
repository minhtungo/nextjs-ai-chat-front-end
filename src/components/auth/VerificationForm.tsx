"use client";

import { FC, useCallback, useEffect, useState } from "react";
import FormWrapper from "./FormWrapper";
import { useSearchParams } from "next/navigation";
import Spinner from "../Spinner";
import { verifyNewUserEmail } from "@/auth/actions";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { signInHref } from "@/routes";

interface VerificationFormProps {}

const VerificationForm: FC<VerificationFormProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setErrorMessage("Missing token");
      return;
    }

    verifyNewUserEmail(token)
      .then((data) => {
        setSuccessMessage(data.success);
        setErrorMessage(data.error);
      })
      .catch(() => {
        setErrorMessage("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <FormWrapper
      headerLabel="Xác thực email"
      backButtonHref={signInHref}
      backButtonLabel="Đăng nhập"
    >
      {!errorMessage && !successMessage && <Spinner />}
      {errorMessage && <FormError message={errorMessage} />}
      {successMessage && <FormSuccess message={successMessage} />}
    </FormWrapper>
  );
};

export default VerificationForm;
