import SignUpForm from "./SignUpForm";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "pages.SignUp" });

  return {
    title: t("title"),
  };
}

export default function SignUp({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  return <SignUpForm />;
}
