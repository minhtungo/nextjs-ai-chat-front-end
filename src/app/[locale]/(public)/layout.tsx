import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Footer from "@/components/public/common/Footer";
import Header from "@/components/public/common/Header";
import { locales } from "@/lib/config";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function GuestLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <MaxWidthWrapper tag="main">{children}</MaxWidthWrapper>
      <Footer />
    </div>
  );
}
