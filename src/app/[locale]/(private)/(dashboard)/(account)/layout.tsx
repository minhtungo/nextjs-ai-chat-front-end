import GoBackButton from "@/components/private/common/GoBackButton";
import SidebarNav from "@/components/private/account/SidebarNav";
import UserInfo from "@/components/private/account/UserInfo";
import MainArea from "@/components/private/common/MainArea";
import ScrollAreaContainer from "@/components/private/common/ScrollAreaContainer";
import Sidebar from "@/components/private/common/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import AccountHeader from "@/components/private/common/AccountHeader";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar>
        <UserInfo className="mb-3 px-4 pt-4" />
        <ScrollArea className="h-full flex-1">
          <SidebarNav className="px-4" />
        </ScrollArea>
        <div className="w-full px-4 py-1.5">
          <GoBackButton className="w-full justify-start" />
        </div>
      </Sidebar>
      <MainArea>
        <AccountHeader />
        <ScrollAreaContainer className="max-w-5xl pb-4 pt-6 sm:pt-8">
          {children}
        </ScrollAreaContainer>
      </MainArea>
    </>
  );
}
