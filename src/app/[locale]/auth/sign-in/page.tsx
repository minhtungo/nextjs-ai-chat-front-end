import SignInForm from "@/components/auth/SignInForm";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "pages.SignIn" });

  return {
    title: t("title"),
  };
}

export default function SignIn({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
