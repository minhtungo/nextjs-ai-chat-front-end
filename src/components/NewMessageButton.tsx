import { cn } from "@/lib/utils";
import { MessageSquarePlus } from "lucide-react";
import { FC } from "react";
import { Button } from "./ui/button";

interface NewMessageButtonProps {
  className?: string;
}

const NewMessageButton: FC<NewMessageButtonProps> = ({ className }) => {
  return (
    <Button size="icon" variant="ghost" className={cn(className)}>
      <MessageSquarePlus className="h-5 w-5 text-muted-foreground" />
    </Button>
  );
};

export default NewMessageButton;
