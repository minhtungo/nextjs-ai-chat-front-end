import { chatUrl } from "@/app-config";
import { SquarePen } from "lucide-react";
import Link from "next/link";

const NewChatButton = () => {
  return (
    <Link href={chatUrl} className="ml-1 lg:hidden">
      <SquarePen className="size-5 text-muted-foreground hover:text-foreground" />
    </Link>
  );
};

export default NewChatButton;
