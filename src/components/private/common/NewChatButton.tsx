import { chatUrl } from "@/app-config";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface NewChatButtonProps {
  className?: string;
}

const NewChatButton: FC<NewChatButtonProps> = ({ className }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={chatUrl}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            className,
          )}
        >
          <SquarePen className="size-[18px] text-muted-foreground" />
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>Create a new chat</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default NewChatButton;
