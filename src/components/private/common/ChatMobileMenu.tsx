import { chatUrl } from "@/app-config";
import Logo from "@/components/common/Logo";
import ChatList from "@/components/private/chat/ChatList";
import ChatDropdownMenu from "@/components/private/common/ChatDropdownMenu";
import SignInPrompt from "@/components/private/common/SignInPrompt";
import ChatSkeleton from "@/components/private/skeleton/ChatSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { isGuestUser } from "@/lib/utils";
import { Menu, SquarePen } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { FC, Suspense } from "react";

interface ChatMobileMenuProps {
  user: User;
}

const ChatMobileMenu: FC<ChatMobileMenuProps> = async ({ user }) => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="size-5 text-muted-foreground hover:text-foreground" />
      </SheetTrigger>
      <SheetContent
        className="flex h-screen flex-col"
        side="left"
        noCloseTrigger
      >
        <div className="flex items-center justify-between px-4 pt-4">
          <SheetClose>
            <Link href="/">
              <Logo />
            </Link>
          </SheetClose>
          <Link href={chatUrl}>
            <SquarePen className="size-5 text-muted-foreground hover:text-foreground" />
          </Link>
        </div>
        <ScrollArea className="flex h-full w-full flex-1 flex-col py-2">
          {!isGuestUser(user.id!) ? (
            <Suspense fallback={<ChatSkeleton />}>
              <ChatList />
            </Suspense>
          ) : (
            <p className="px-4 text-sm text-muted-foreground">
              You must be logged in to view the chat history
            </p>
          )}
        </ScrollArea>
        <div className="px-4 pb-4">
          {!isGuestUser(user.id!) ? (
            <ChatDropdownMenu user={user} />
          ) : (
            <SignInPrompt />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatMobileMenu;
