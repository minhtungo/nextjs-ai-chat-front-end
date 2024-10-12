import Page from "@/components/layout/Page";
import AuthError from "@/features/auth/components/AuthError";
import { unstable_setRequestLocale } from "next-intl/server";

const AuthErrorPage = ({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) => {
  return (
    <Page className="flex h-full w-full items-center justify-center">
      <AuthError />
    </Page>
  );
};

export default AuthErrorPage;
