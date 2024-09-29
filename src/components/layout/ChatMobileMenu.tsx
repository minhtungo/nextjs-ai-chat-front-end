import { chatUrl } from "@/app-config";
import ChatDropdownMenu from "@/components/chat/ChatDropdownMenu";
import ChatList from "@/components/chat/ChatList";
import SheetWrapper from "@/components/common/SheetWrapper";
import SignInPrompt from "@/components/common/SignInPrompt";

import ChatSkeleton from "@/components/skeleton/ChatSkeleton";
import { isGuestUser } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";

interface ChatMobileMenuProps {
  user: User;
}

const ChatMobileMenu = async ({ user }: ChatMobileMenuProps) => {
  return (
    <>
      <SheetWrapper
        action={
          <Link href={chatUrl}>
            <SquarePen className="size-5 text-muted-foreground hover:text-foreground" />
          </Link>
        }
        side="left"
        footer={
          <div className="px-4 pb-4">
            {!isGuestUser(user.id!) ? (
              <ChatDropdownMenu user={user} />
            ) : (
              <SignInPrompt />
            )}
          </div>
        }
        noCloseTrigger
      >
        {!isGuestUser(user.id!) ? (
          <Suspense fallback={<ChatSkeleton />}>
            <ChatList />
          </Suspense>
        ) : (
          <p className="px-4 text-sm text-muted-foreground">
            You must be logged in to view the chat history
          </p>
        )}
      </SheetWrapper>
    </>
  );
};

export default ChatMobileMenu;
