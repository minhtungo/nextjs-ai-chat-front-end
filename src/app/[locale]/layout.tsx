import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import { locales } from "@/lib/config";
import { unstable_setRequestLocale } from "next-intl/server";
import "@/styles/globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Lumi",
    template: "%s | Lumi",
  },
  description: "",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
