"use client";

import { buttonVariants } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { PROTECTED_BASE_URL } from "@/routes";
import { Chat } from "@/types/chat";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface SidebarItemProps {
  index: number;
  chat: Chat;
  children: React.ReactNode;
}

const ChatItem: FC<SidebarItemProps> = ({ index, chat, children }) => {
  const pathname = usePathname();

  const isActive = pathname === `${PROTECTED_BASE_URL}/chat/${chat.id}`;

  return (
    <div className="group relative h-8">
      <Link
        href={`${PROTECTED_BASE_URL}/chat/${chat.id}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full overflow-hidden px-8 transition-colors group-hover:bg-accent/40",
          isActive && "bg-accent pr-16 font-semibold",
        )}
      >
        <div className="absolute left-2 top-2.5 flex size-5 items-center justify-center">
          <MessageCircle className="mr-1 text-zinc-500" />
        </div>
        <div className="relative max-h-5 w-[110px] flex-1 select-none overflow-hidden text-ellipsis break-all">
          {chat.title}
        </div>
      </Link>
      <div
        className={cn(
          "absolute right-2 top-1.5 hidden",
          isActive ? "block" : "group-hover:block",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ChatItem;
