import ChatList from "@/components/private/chat/ChatList";
import ChatDropdownMenu from "@/components/private/common/ChatDropdownMenu";
import NewChatButton from "@/components/private/common/NewChatButton";
import SidebarToggle from "@/components/private/common/SidebarToggle";
import SidebarWithToggle from "@/components/private/common/SidebarWithToggle";
import SignInPrompt from "@/components/private/common/SignInPrompt";
import ChatSkeleton from "@/components/private/skeleton/ChatSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "next-auth";
import { Suspense } from "react";

interface ChatSidebarProps {
  user: User | undefined;
}

const ChatSidebar = async ({ user }: ChatSidebarProps) => {
  return (
    <SidebarWithToggle side="left" className="peer/chat gap-y-3 pt-4">
      <div className="flex items-center justify-between px-4">
        <SidebarToggle side="left" />
        <NewChatButton />
      </div>
      <ScrollArea className="h-full flex-1">
        {user && (
          <Suspense fallback={<ChatSkeleton />}>
            <ChatList />
          </Suspense>
        )}
      </ScrollArea>
      <div className="w-full px-4 pb-3">
        {user ? <ChatDropdownMenu /> : <SignInPrompt />}
      </div>
    </SidebarWithToggle>
  );
};

export default ChatSidebar;
