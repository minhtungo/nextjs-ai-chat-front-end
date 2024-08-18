import AOSWrapper from "@/components/common/AOS";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Footer from "@/components/public/common/Footer";
import Header from "@/components/public/common/Header";

export default function ChildPublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AOSWrapper>
      <Header />
      <MaxWidthWrapper tag="main">{children}</MaxWidthWrapper>
      <Footer />
    </AOSWrapper>
  );
}
