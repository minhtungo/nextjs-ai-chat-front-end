import ChatDropdownMenu from "@/components/chat/ChatDropdownMenu";
import ChatList from "@/components/chat/ChatList";
import SheetWrapper from "@/components/common/SheetWrapper";
import SignInPrompt from "@/components/common/SignInPrompt";
import { chatUrl } from "@/config/config";

import ChatSkeleton from "@/components/skeleton/ChatSkeleton";
import { isGuestUser } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";

interface ChatMobileMenuProps {
  user: User;
}

const ChatMobileMenuFooter = ({ user }: { user: User }) => {
  return (
    <>
      {!isGuestUser(user.id!) ? (
        <ChatDropdownMenu user={user} />
      ) : (
        <SignInPrompt />
      )}
    </>
  );
};

const ChatMobileMenuAction = () => {
  return (
    <Link href={chatUrl}>
      <SquarePen className="size-5 text-muted-foreground hover:text-foreground" />
    </Link>
  );
};

const ChatMobileMenu = async ({ user }: ChatMobileMenuProps) => {
  return (
    <SheetWrapper
      action={<ChatMobileMenuAction />}
      footer={<ChatMobileMenuFooter user={user} />}
      side="left"
    >
      {!isGuestUser(user.id!) ? (
        <Suspense fallback={<ChatSkeleton />}>
          <ChatList />
        </Suspense>
      ) : (
        <p className="text-sm text-muted-foreground">
          You must be logged in to view the chat history.
        </p>
      )}
    </SheetWrapper>
  );
};

export default ChatMobileMenu;
