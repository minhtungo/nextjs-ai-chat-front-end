import ChatList from "@/components/private/chat/ChatList";
import ChatDropdownMenu from "@/components/private/common/ChatDropdownMenu";
import SignInPrompt from "@/components/private/common/SignInPrompt";
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
      <div className="w-full px-4 pb-4">
        {user ? <ChatDropdownMenu user={user} /> : <SignInPrompt />}
      </div>
    </>
  );
};

export default ChatSidebarContent;
