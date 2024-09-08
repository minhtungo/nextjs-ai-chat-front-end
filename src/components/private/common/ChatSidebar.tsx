import { chatUrl } from "@/app-config";
import Logo from "@/components/common/Logo";
import ChatList from "@/components/private/chat/ChatList";
import ChatDropdownMenu from "@/components/private/common/ChatDropdownMenu";
import NewChatButton from "@/components/private/common/NewChatButton";
import Sidebar from "@/components/private/common/Sidebar";
import SignInPrompt from "@/components/private/common/SignInPrompt";
import ChatSkeleton from "@/components/private/skeleton/ChatSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "next-auth";
import Link from "next/link";
import { FC, Suspense } from "react";

interface ChatSidebarProps {
  user: User | undefined;
}

const ChatSidebar: FC<ChatSidebarProps> = async ({ user }) => {
  return (
    <Sidebar className="peer/chat flex-col gap-y-3 lg:flex" type="chat">
      <div className="flex items-center justify-between px-4 pt-4">
        <Link href={chatUrl}>
          <Logo />
        </Link>
        <NewChatButton />
      </div>
      <ScrollArea className="h-full flex-1 py-2">
        {user && (
          <Suspense fallback={<ChatSkeleton />}>
            <ChatList />
          </Suspense>
        )}
      </ScrollArea>
      <div className="w-full px-4 pb-3">
        {user ? <ChatDropdownMenu /> : <SignInPrompt />}
      </div>
    </Sidebar>
  );
};

export default ChatSidebar;
