import { chatUrl, signInUrl } from "@/app-config";
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
  return (
    <Sidebar>
      <div className="space-y-3 px-4 pt-4">
        <Link href={chatUrl}>
          <Logo />
        </Link>
        {user && (
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
        )}
      </div>
      <ScrollArea className="h-full flex-1">
        {user ? (
          <Suspense fallback={<ChatSkeleton />}>
            <ChatList className="py-2" />
          </Suspense>
        ) : (
          <p className="px-4 text-sm text-muted-foreground">
            You must be logged in to view the chat history
          </p>
        )}
      </ScrollArea>
      <div className="w-full px-4 pb-4">
        {user ? (
          <div className="border-t pt-2">
            <ChatDropdownMenu />
          </div>
        ) : (
          <div>
            <Link
              className={cn(
                buttonVariants({
                  size: "sm",
                }),
                "w-full justify-start",
              )}
              href={signInUrl}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default ChatSidebar;
