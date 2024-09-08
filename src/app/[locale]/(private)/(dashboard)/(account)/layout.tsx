import AccountHeader from "@/components/private/common/AccountHeader";
import AccountSidebar from "@/components/private/common/AccountSidebar";
import MainArea from "@/components/private/common/MainArea";
import ScrollAreaContainer from "@/components/private/common/ScrollAreaContainer";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AccountSidebar />
      <MainArea className="pl-[300px]">
        <AccountHeader />
        <ScrollAreaContainer className="relative max-w-5xl py-6">
          {children}
        </ScrollAreaContainer>
      </MainArea>
    </>
  );
}
