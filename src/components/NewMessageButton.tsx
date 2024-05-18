import { FC } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { BotMessageSquare } from "lucide-react";

interface NewMessageButtonProps {
  className?: string;
}

const NewMessageButton: FC<NewMessageButtonProps> = ({ className }) => {
  return (
    <Button size="icon" variant="ghost" className={cn(className)}>
      <BotMessageSquare className="h-5 w-5" />
    </Button>
  );
};

export default NewMessageButton;
