import Page from "@/components/public/common/Page";
import AuthError from "./AuthError";
import { unstable_setRequestLocale } from "next-intl/server";

const AuthErrorPage = ({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) => {
  unstable_setRequestLocale(locale);

  return (
    <Page className="flex h-full w-full items-center justify-center">
      <AuthError />
    </Page>
  );
};

export default AuthErrorPage;
