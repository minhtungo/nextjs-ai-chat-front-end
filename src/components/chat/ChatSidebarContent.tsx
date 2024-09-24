import ChatDropdownMenu from "@/components/chat/ChatDropdownMenu";
import ChatList from "@/components/chat/ChatList";
import UpgradePrompt from "@/components/chat/UpgradePrompt";
import SignInPrompt from "@/components/common/SignInPrompt";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/auth";

const ChatSidebarContent = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <ScrollArea className="h-full flex-1">
        {user ? (
          <ChatList />
        ) : (
          <div className="px-4 text-sm text-muted-foreground">
            You must be logged in to view the chat history.
          </div>
        )}
      </ScrollArea>

      {user && user.plan === "free" && (
        <div className="px-4">
          <UpgradePrompt />
        </div>
      )}

      <div className="w-full px-4 pb-4">
        {user ? <ChatDropdownMenu user={user} /> : <SignInPrompt />}
      </div>
    </>
  );
};

export default ChatSidebarContent;
