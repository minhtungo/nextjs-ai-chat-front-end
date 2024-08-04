import Logo from "@/components/common/Logo";
import ChatHistory from "@/components/private/chat/ChatHistory";
import CreateChatButton from "@/components/private/chat/CreateChatButton";
import Sidebar from "@/components/private/common/Sidebar";
import Header from "@/components/private/dashboard/Header";
import UserMenu from "@/components/private/dashboard/UserMenu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PROTECTED_BASE_URL } from "@/lib/routes";
import Link from "next/link";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-[100dvh]">
      <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-card duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[300px]">
        <div className="relative grid min-h-[100dvh] grid-rows-[auto_1fr_auto] gap-2 py-3">
          <div className="mb-3 px-4">
            <div className="mb-3 flex items-center justify-between">
              <Link href={PROTECTED_BASE_URL}>
                <Logo />
              </Link>
            </div>
            <CreateChatButton />
          </div>
          <ScrollArea className="h-full flex-1">
            <div className="overflow-hidden px-4 py-2">
              <ChatHistory />
            </div>
          </ScrollArea>
          <div className="w-full px-4">
            <UserMenu />
          </div>
        </div>
      </Sidebar>
      <main className="relative flex h-screen w-full flex-1 flex-col overflow-auto pl-0 duration-300 ease-in-out animate-in peer-[[data-state=open]]:lg:pl-[300px]">
        <Header />
        <div className="group relative flex h-full w-full flex-1 flex-col overflow-hidden py-4">
          {children}
        </div>
      </main>
    </div>
  );
}
