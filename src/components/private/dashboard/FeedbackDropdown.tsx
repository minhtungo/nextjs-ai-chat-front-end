import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquareMore } from "lucide-react";
import { FC } from "react";
import FeedbackForm from "./FeedbackForm";

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
        <FeedbackForm />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FeedbackDropdown;
