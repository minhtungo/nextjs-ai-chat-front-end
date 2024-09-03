import { chatUrl } from "@/app-config";
import Logo from "@/components/common/Logo";
import ChatList from "@/components/private/chat/ChatList";
import ChatDropdownMenu from "@/components/private/common/ChatDropdownMenu";
import Sidebar from "@/components/private/common/Sidebar";
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
  if (!user) return null;

  return (
    <Sidebar>
      <div className="space-y-3 px-4 pt-4">
        <Link href={chatUrl}>
          <Logo />
        </Link>
        {/* <CreateChatButton /> */}
        <Link
          className={cn(
            buttonVariants({
              size: "sm",
            }),
            "w-full justify-start",
          )}
          href={chatUrl}
        >
          <Plus className="size-4" />
          New Chat
        </Link>
      </div>
      <ScrollArea className="h-full flex-1">
        <Suspense fallback={<ChatSkeleton />}>
          <ChatList className="py-2" />
        </Suspense>
      </ScrollArea>
      <div className="w-full px-4">
        <div className="border-t py-1.5">
          <ChatDropdownMenu />
        </div>
      </div>
    </Sidebar>
  );
};

export default ChatSidebar;
