import Sidebar from "@/components/private/common/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import Container from "@/components/private/common/Container";
import GoBackButton from "@/components/private/account/GoBackButton";
import Header from "@/components/private/account/Header";
import SidebarNav from "@/components/private/account/SidebarNav";
import UserInfo from "@/components/private/account/UserInfo";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-card duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
        <div className="flex h-full max-h-screen flex-col gap-2 py-3">
          <Suspense>
            <UserInfo className="mb-3 px-4" />
          </Suspense>
          <ScrollArea className="h-full flex-1">
            <Suspense>
              <SidebarNav className="px-4" />
            </Suspense>
          </ScrollArea>
          <div className="w-full px-4">
            <GoBackButton className="w-full justify-start" />
          </div>
        </div>
      </Sidebar>
      <main className="relative flex h-screen w-full flex-1 flex-col overflow-auto pl-0 duration-300 ease-in-out animate-in peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        <Header />
        <div className="group relative flex h-full w-full flex-1 flex-col gap-4 overflow-hidden">
          <Container>{children}</Container>
        </div>
      </main>
    </div>
  );
}
