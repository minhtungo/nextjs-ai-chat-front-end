"use client";

import Hint from "@/components/common/Hint";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

interface ChatActionsProps {
  children: React.ReactNode;
}

const ChatActions = ({ children }: ChatActionsProps) => {
  return (
    <DropdownMenu modal={false}>
      <Hint label="Options">
        <DropdownMenuTrigger>
          <Ellipsis className="size-4" />
        </DropdownMenuTrigger>
      </Hint>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatActions;
