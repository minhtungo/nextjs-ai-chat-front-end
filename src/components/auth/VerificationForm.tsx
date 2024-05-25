"use client";

import { FC, useCallback, useEffect, useState } from "react";
import CardWrapper from "../CardWrapper";
import { useSearchParams } from "next/navigation";
import Spinner from "../Spinner";
import { verifyNewUserEmail } from "@/actions/auth";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { signInHref } from "@/routes";
import { useTranslations } from "next-intl";

interface VerificationFormProps {}

const VerificationForm: FC<VerificationFormProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const t = useTranslations("auth");

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
        setErrorMessage("error.generalError");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel={t("Verification.title")}
      backButtonHref={signInHref}
      backButtonLabel={t("Verification.cta")}
    >
      {!errorMessage && !successMessage && <Spinner />}
      {/* @ts-ignore*/}
      {errorMessage && <FormError message={t(errorMessage)} />}
      {/* @ts-ignore*/}
      {successMessage && <FormSuccess message={t(successMessage)} />}
    </CardWrapper>
  );
};

export default VerificationForm;
