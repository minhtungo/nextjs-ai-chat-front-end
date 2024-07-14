import CreateChat from "@/app/[locale]/(private)/dashboard/(chat)/components/CreateChat";
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
