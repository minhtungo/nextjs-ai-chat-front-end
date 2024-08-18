import { unstable_setRequestLocale } from "next-intl/server";

export default function PublicLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      {children}
    </div>
  );
}
