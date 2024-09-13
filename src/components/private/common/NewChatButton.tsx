import { chatUrl } from "@/app-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface NewChatButtonProps {
  className?: string;
}

const NewChatButton: FC<NewChatButtonProps> = ({ className }) => {
  return (
    <Link
      href={chatUrl}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        className,
      )}
    >
      <SquarePen className="size-[18px] text-muted-foreground" />
    </Link>
  );
};

export default NewChatButton;
