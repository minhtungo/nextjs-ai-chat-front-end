"use client";

import { verifyNewUserEmailAction } from "@/actions/auth";
import CardWrapper from "@/components/common/CardWrapper";
import Spinner from "@/components/common/Spinner";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import BackButton from "@/components/common/BackButton";
import Typography from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useServerAction } from "zsa-react";
import { signInUrl } from "@/config/config";
import ResendVerificationEmail from "@/app/[locale]/(public)/(auth)/verification/ResendVerificationEmail";

const VerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { data, error, execute, isPending } = useServerAction(
    verifyNewUserEmailAction,
  );

  const t = useTranslations("auth");

  const onSubmit = useCallback(async () => {
    if (!token) {
      return;
    }

    await execute(token);

    console.log("verification", data);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper headerLabel={t("Verification.title")} noBorderMobile>
      {isPending && (
        <div className="mb-3 text-center">
          <Typography className="mb-2 text-muted-foreground">
            We are verifying your email.
          </Typography>
          <Spinner />
        </div>
      )}
      {error && <FormError message={t(error.message as any)} />}
      {!token && <FormError message={t("error.tokenMissing")} />}
      {error && t(error.message as any) === t("error.tokenExpired") && (
        <ResendVerificationEmail className="mt-4" token={token!} />
      )}
      {data && data.message && (
        <>
          <Typography className="text-muted-foreground-2 mt-2">
            Your email has been successfully verified. You can now sign in to
            your account.
          </Typography>
          <FormSuccess message={t(data.message as any)} />
        </>
      )}
      {data && data.message && (
        <BackButton
          variant="outline"
          href={signInUrl}
          label="Sign in"
          className="mt-4"
        />
      )}
    </CardWrapper>
  );
};

export default VerificationForm;
