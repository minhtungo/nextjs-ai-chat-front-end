import Sidebar from "@/components/Sidebar";
import SidebarToggle from "@/components/dashboard/SidebarToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserMenu from "../components/UserMenu";
import Header from "./components/Header";
import ChatHistory from "./components/ChatHistory";
import Link from "next/link";
import Logo from "@/components/Logo";
import CreateChatButton from "./components/CreateChat";
import { PROTECTED_BASE_URL } from "@/routes";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-card duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
        <div className="relative flex h-full max-h-screen flex-col gap-2 py-3">
          <ScrollArea className="h-full flex-1">
            <div className="mb-3 px-4">
              <div className="mb-3 flex items-center justify-between">
                <Link href={PROTECTED_BASE_URL}>
                  <Logo />
                </Link>
              </div>
              <CreateChatButton />
            </div>
            <div className="mt-5 overflow-hidden px-4">
              <ChatHistory />
            </div>
          </ScrollArea>
          <div className="w-full px-4">
            <UserMenu />
          </div>
          <SidebarToggle className="absolute -right-3 top-1/2 -translate-y-1/2" />
        </div>
      </Sidebar>
      <main className="relative flex h-screen w-full flex-1 flex-col overflow-auto pl-0 duration-300 ease-in-out animate-in peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        <Header />
        <div className="group relative flex h-full w-full flex-1 flex-col gap-4 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
