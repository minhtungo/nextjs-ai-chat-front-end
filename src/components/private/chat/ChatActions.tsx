"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Ellipsis } from "lucide-react";
import { FC } from "react";

interface ChatActionsProps {
  children: React.ReactNode;
}

const ChatActions: FC<ChatActionsProps> = ({ children }) => {
  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger className="bg-accent">
            <Ellipsis className="size-4" />
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Options</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatActions;
