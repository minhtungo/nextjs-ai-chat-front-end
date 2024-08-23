import { chatUrl } from "@/app-config";
import Logo from "@/components/common/Logo";
import ChatList from "@/components/private/chat/ChatList";
import CreateChatButton from "@/components/private/chat/CreateChatButton";
import ChatDropdownMenu from "@/components/private/common/ChatDropdownMenu";
import Sidebar from "@/components/private/common/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

const ChatSidebar = async () => {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
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
  );
};

export default ChatSidebar;
