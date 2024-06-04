import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquareMore } from "lucide-react";
import Feedback from "./Feedback";

interface FeedbackDropdownProps {}

const FeedbackDropdown: FC<FeedbackDropdownProps> = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hidden gap-1 md:inline-flex"
        >
          <MessageSquareMore className="h-4 w-4" /> Feedback
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[300px] space-y-4 p-4">
        <Feedback />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FeedbackDropdown;
