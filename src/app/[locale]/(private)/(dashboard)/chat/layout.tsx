import { chatUrl } from "@/app-config";
import Logo from "@/components/common/Logo";
import ChatList from "@/components/private/chat/ChatList";
import CreateChatButton from "@/components/private/chat/CreateChatButton";
import ChatDropdownMenu from "@/components/private/common/ChatDropdownMenu";
import ChatHeader from "@/components/private/common/ChatHeader";
import MainArea from "@/components/private/common/MainArea";
import Sidebar from "@/components/private/common/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar>
        <div className="space-y-3 px-4 pt-4">
          <Link href={chatUrl}>
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
          <div className="border-t py-1.5">
            <ChatDropdownMenu />
          </div>
        </div>
      </Sidebar>
      <MainArea>
        <ChatHeader />
        <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden py-4">
          {children}
        </div>
      </MainArea>
    </>
  );
}
