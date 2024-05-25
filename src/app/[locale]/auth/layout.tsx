import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

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
      <Navbar />
      <main className="flex h-[calc(100vh-56px)] w-full items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
