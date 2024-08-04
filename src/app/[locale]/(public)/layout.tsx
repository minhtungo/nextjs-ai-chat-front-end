import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Footer from "@/components/public/common/Footer";
import Navbar from "@/components/public/common/Navbar";
import NavButtons from "@/components/public/common/NavButtons";
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
