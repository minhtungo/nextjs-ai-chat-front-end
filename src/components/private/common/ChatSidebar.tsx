import { chatUrl } from "@/app-config";
import Logo from "@/components/common/Logo";
import ChatList from "@/components/private/chat/ChatList";
import ChatDropdownMenu from "@/components/private/common/ChatDropdownMenu";
import NewChatButton from "@/components/private/common/NewChatButton";
import Sidebar from "@/components/private/common/Sidebar";
import SignInPrompt from "@/components/private/common/SignInPrompt";
import ChatSkeleton from "@/components/private/skeleton/ChatSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { FC, Suspense } from "react";

interface ChatSidebarProps {
  user: User | undefined;
}

const ChatSidebar: FC<ChatSidebarProps> = async ({ user }) => {
  return (
    <Sidebar>
      <div className="flex items-center justify-between px-4 pt-4">
        <Link href={chatUrl}>
          <Logo />
        </Link>
        <NewChatButton />
      </div>
      <ScrollArea className="h-full flex-1">
        {user && (
          <Suspense fallback={<ChatSkeleton />}>
            <ChatList className="py-2" />
          </Suspense>
        )}
      </ScrollArea>
      <div className="w-full px-4 pb-4">
        {user ? (
          <div className="border-t pt-2">
            <ChatDropdownMenu />
          </div>
        ) : (
          <SignInPrompt />
        )}
      </div>
    </Sidebar>
  );
};

export default ChatSidebar;
