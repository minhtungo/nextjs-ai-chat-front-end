import VerificationForm from "@/components/auth/VerificationForm";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: "pages.EmailVerification",
  });

  return {
    title: t("title"),
  };
}

const VerificationPage = ({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) => {
  unstable_setRequestLocale(locale);

  return (
    <Suspense>
      <VerificationForm />
    </Suspense>
  );
};

export default VerificationPage;
