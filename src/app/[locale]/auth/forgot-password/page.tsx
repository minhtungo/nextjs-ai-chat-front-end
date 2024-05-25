import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: "pages.ForgotPassword",
  });

  return {
    title: t("title"),
  };
}

export default function ForgotPasswordPage({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  return <ForgotPasswordForm />;
}
