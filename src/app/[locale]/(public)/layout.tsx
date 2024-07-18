import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NavButtons from "@/components/NavButtons";
import Navbar from "@/components/public/common/Navbar";
import { locales } from "@/lib/config";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

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
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
      <Suspense>
        <Navbar navButtons={<NavButtons />} />
      </Suspense>
      <MaxWidthWrapper tag="main">{children}</MaxWidthWrapper>
      <Footer />
    </div>
  );
}
