import CreateChat from "@/app/[locale]/(private)/dashboard/new-chat/components/CreateChat";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { FC, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import SidebarList from "./SidebarList";
import Logo from "../Logo";
import SidebarToggle from "../dashboard/SidebarToggle";

interface ChatHistoryProps {
  className?: string;
}

const ChatHistory: FC<ChatHistoryProps> = async ({ className }) => {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div className={cn("flex h-full flex-col gap-y-2", className)}>
      {/* <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10",
          )}
        >
          <Plus className="size-4 -translate-x-2 stroke-2" />
          New Chat
        </Link> */}
      <div className="mb-2 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-x-2"></div>
      </div>
      <CreateChat />
      <Suspense
        fallback={
          <div className="flex flex-1 flex-col space-y-1.5 overflow-auto">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={`${i}-chat-skeleton`}
                className="h-10 w-full shrink-0"
              />
            ))}
          </div>
        }
      >
        <SidebarList userId={user.id} />
      </Suspense>
    </div>
  );
};

export default ChatHistory;
