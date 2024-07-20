import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquareMore } from "lucide-react";
import FeedbackForm from "./FeedbackForm";

const FeedbackDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hidden gap-1 text-muted-foreground md:inline-flex"
        >
          <MessageSquareMore className="size-4" /> Feedback
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[300px] space-y-4 p-4">
        <FeedbackForm />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FeedbackDropdown;
