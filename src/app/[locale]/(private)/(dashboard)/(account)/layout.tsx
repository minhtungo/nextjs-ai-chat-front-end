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
      <MainArea>
        <AccountHeader />
        <ScrollAreaContainer className="max-w-5xl pb-4 pt-6 sm:pt-8">
          {children}
        </ScrollAreaContainer>
      </MainArea>
    </>
  );
}
