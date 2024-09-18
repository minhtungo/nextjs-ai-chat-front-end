"use client";

import { chatUrl } from "@/app-config";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NewChatButtonProps extends React.ComponentProps<"a"> {}

const NewChatButton = ({ className }: NewChatButtonProps) => {
  const path = usePathname();
  const { isSidebarOpen } = useSidebar("left");
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={path !== chatUrl ? chatUrl : "#"}
          className={cn(
            buttonVariants({
              size: "sm",
            }),
            "w-full rounded-full p-2",
            path === chatUrl && "pointer-events-none opacity-50",
            className,
          )}
        >
          <Plus className="size-5" />
          {isSidebarOpen && <span>New Chat</span>}
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>Create a new chat</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default NewChatButton;
