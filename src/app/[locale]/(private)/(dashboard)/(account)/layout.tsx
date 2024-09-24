import AccountHeader from "@/components/layout/AccountHeader";
import AccountSidebar from "@/components/layout/AccountSidebar";
import MainArea from "@/components/layout/MainArea";
import ScrollAreaContainer from "@/components/layout/ScrollAreaContainer";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AccountSidebar />
      <MainArea className="pl-0 lg:pl-[300px]">
        <AccountHeader />
        <ScrollAreaContainer className="relative max-w-5xl py-6">
          {children}
        </ScrollAreaContainer>
      </MainArea>
    </>
  );
}
