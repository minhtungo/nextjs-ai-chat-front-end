import { signInUrl, signUpUrl } from "@/app-config";
import Logo from "@/components/common/Logo";
import ChatHeaderTitle from "@/components/private/common/ChatHeaderTitle";
import ChatMobileMenu from "@/components/private/common/ChatMobileMenu";
import NewChatButton from "@/components/private/common/NewChatButton";
import FeedbackDropdown from "@/components/private/feedback/FeedbackDropdown";
import { buttonVariants } from "@/components/ui/button";
import { cn, isGuestUser } from "@/lib/utils";
import Link from "next/link";
import { FC, Suspense } from "react";

interface ChatHeaderProps {
  userId: string;
  chatId?: string;
  className?: string;
}

const ChatHeader: FC<ChatHeaderProps> = async ({
  userId,
  chatId,
  className,
}) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b px-4 lg:px-6",
        className,
      )}
    >
      {!isGuestUser(userId) ? (
        <>
          <Suspense fallback={<p>Loading...</p>}>
            <ChatHeaderTitle className="hidden lg:block" chatId={chatId} />
          </Suspense>
          <ChatMobileMenu userId={userId} />
        </>
      ) : (
        <Link href="/">
          <Logo />
        </Link>
      )}
      <div className="flex items-center justify-end gap-x-2">
        <FeedbackDropdown />
        {isGuestUser(userId) && (
          <div className="flex items-center gap-x-2">
            <Link
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "outline",
                }),
              )}
              href={signUpUrl}
            >
              Sign up
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  size: "sm",
                }),
              )}
              href={signInUrl}
            >
              Login
            </Link>
          </div>
        )}
        {/* {user?.plan === "free" ? <UpgradeButton /> : null} */}
        {!isGuestUser(userId) && <NewChatButton className="ml-1 lg:hidden" />}
      </div>
    </header>
  );
};

export default ChatHeader;
