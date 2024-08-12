import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import AuthHeader from "@/components/public/common/AuthHeader";
import { locales } from "@/lib/config";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function AuthLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <AuthHeader />
      <MaxWidthWrapper
        tag="main"
        className="flex h-full w-full items-center justify-center py-12"
      >
        {children}
      </MaxWidthWrapper>
    </>
  );
}
