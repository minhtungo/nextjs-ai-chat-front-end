import Sidebar from "@/components/private/common/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import ScrollAreaContainer from "@/components/private/common/ScrollAreaContainer";
import GoBackButton from "@/components/private/account/GoBackButton";
import Header from "@/components/private/account/Header";
import SidebarNav from "@/components/private/account/SidebarNav";
import UserInfo from "@/components/private/account/UserInfo";
import MainArea from "@/components/private/common/MainArea";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar>
        <UserInfo className="mb-3 px-4" />
        <ScrollArea className="h-full flex-1">
          <Suspense>
            <SidebarNav className="px-4" />
          </Suspense>
        </ScrollArea>
        <div className="w-full px-4">
          <GoBackButton className="w-full justify-start" />
        </div>
      </Sidebar>
      <MainArea>
        <Header />
        <ScrollAreaContainer className="py-4">{children}</ScrollAreaContainer>
      </MainArea>
    </>
  );
}
