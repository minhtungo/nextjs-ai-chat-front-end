import AOSWrapper from "@/components/common/AOS";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Footer from "@/components/public/common/Footer";
import Header from "@/components/public/common/Header";
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
      <Header />
      <MaxWidthWrapper tag="main">{children}</MaxWidthWrapper>
      <Footer />
    </AOSWrapper>
  );
}
