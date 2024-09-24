"use client";

import TooltipContainer from "@/components/common/TooltipContainer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { FC } from "react";

interface ChatActionsProps {
  children: React.ReactNode;
}

const ChatActions: FC<ChatActionsProps> = ({ children }) => {
  return (
    <DropdownMenu modal={false}>
      <TooltipContainer content="Options">
        <DropdownMenuTrigger>
          <Ellipsis className="size-4" />
        </DropdownMenuTrigger>
      </TooltipContainer>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatActions;
