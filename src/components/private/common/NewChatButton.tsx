import { chatUrl } from "@/app-config";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface NewChatButtonProps {
  className?: string;
}

const NewChatButton: FC<NewChatButtonProps> = ({ className }) => {
  return (
    <Link href={chatUrl} className={cn(className)}>
      <SquarePen className="size-4 text-muted-foreground hover:text-foreground sm:size-[18px]" />
    </Link>
  );
};

export default NewChatButton;
