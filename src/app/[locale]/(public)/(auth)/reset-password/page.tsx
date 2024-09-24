import Page from "@/components/layout/Page";
import ResetPasswordForm from "./ResetPasswordForm";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "pages.ResetPassword" });

  return {
    title: t("title"),
  };
}

export default function ResetPasswordPage({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  return (
    <Page className="flex h-full w-full items-center justify-center">
      <ResetPasswordForm />
    </Page>
  );
}
