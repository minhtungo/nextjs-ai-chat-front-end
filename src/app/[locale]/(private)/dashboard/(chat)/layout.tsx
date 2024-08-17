import Logo from "@/components/common/Logo";
import ChatList from "@/components/private/chat/ChatList";
import CreateChatButton from "@/components/private/chat/CreateChatButton";
import MainArea from "@/components/private/common/MainArea";
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
    <>
      <Sidebar>
        <div className="space-y-3 px-4">
          <Link href={PROTECTED_BASE_URL}>
            <Logo />
          </Link>
          <CreateChatButton />
        </div>
        <ScrollArea className="h-full flex-1">
          <div className="py-2">
            <ChatList />
          </div>
        </ScrollArea>
        <div className="w-full px-4">
          <UserMenu />
        </div>
      </Sidebar>
      <MainArea>
        <Header />
        <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden py-4">
          {children}
        </div>
      </MainArea>
    </>
  );
}
