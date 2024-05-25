import AuthError from "@/components/auth/AuthError";
import { unstable_setRequestLocale } from "next-intl/server";

const AuthErrorPage = ({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) => {
  unstable_setRequestLocale(locale);

  return <AuthError />;
};

export default AuthErrorPage;
