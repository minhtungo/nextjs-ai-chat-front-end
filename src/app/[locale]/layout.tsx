import Providers from "@/components/providers";
import { locales } from "@/lib/config";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "Lumi",
    template: "%s | Lumi",
  },
  description: "",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  unstable_setRequestLocale(params.locale);

  return (
    <html
      suppressHydrationWarning
      lang={params.locale}
      className={GeistSans.className}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
