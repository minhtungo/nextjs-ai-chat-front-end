"use client";

import { chatUrl } from "@/app-config";
import TooltipContainer from "@/components/common/TooltipContainer";
import { buttonVariants } from "@/components/ui/button";
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
    <TooltipContainer content="New chat">
      <Link
        href={path !== chatUrl ? chatUrl : "#"}
        className={cn(
          buttonVariants({
            size: "manual",
          }),
          "w-full gap-0 p-2",
          path === chatUrl && "pointer-events-none opacity-50",
          className,
        )}
      >
        <Plus className="size-5" />
        <span
          className={cn(
            "ml-2 opacity-100",
            !isSidebarOpen && "ml-0 w-0 opacity-0",
          )}
        >
          New Chat
        </span>
      </Link>
    </TooltipContainer>
  );
};

export default NewChatButton;
