import AOSWrapper from "@/components/common/AOS";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Footer from "@/components/layout/Footer";
import PublicHeader from "@/components/layout/PublicHeader";
import { unstable_setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function PublicLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <AOSWrapper>
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <PublicHeader />
        <MaxWidthWrapper tag="main">{children}</MaxWidthWrapper>
        <Footer />
      </div>
    </AOSWrapper>
  );
}
