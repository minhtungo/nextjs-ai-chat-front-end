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
import { Button } from "../ui/button";
import BackButton from "./BackButton";
import { CardDescription } from "../ui/card";
import Typography from "../ui/typography";

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
    <CardWrapper headerLabel={t("Verification.title")} noBorder>
      {!errorMessage && !successMessage && (
        <>
          <Typography className="mb-2 text-muted-foreground">
            We are verifying your email. Please wait.
          </Typography>
          <Spinner />
        </>
      )}
      {/* @ts-ignore*/}
      {errorMessage && <FormError message={t(errorMessage)} />}
      {/* @ts-ignore*/}
      {successMessage && (
        <>
          <Typography className="text-muted-foreground-2 mt-2">
            Your email has been successfully verified. You can now sign in to
            your account.
          </Typography>
          <FormSuccess message={t(successMessage)} />
        </>
      )}
      {(errorMessage || successMessage) && (
        <BackButton
          variant="outline"
          href={signInHref}
          label="Sign in"
          className="mt-4"
        />
      )}
    </CardWrapper>
  );
};

export default VerificationForm;
