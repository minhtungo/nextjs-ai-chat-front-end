import AOSWrapper from "@/components/common/AOS";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Footer from "@/components/public/common/Footer";
import PublicHeader from "@/components/public/common/PublicHeader";
import { unstable_setRequestLocale } from "next-intl/server";

export default function ChildPublicLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <AOSWrapper>
      <PublicHeader />
      <MaxWidthWrapper tag="main">{children}</MaxWidthWrapper>
      <Footer />
    </AOSWrapper>
  );
}
