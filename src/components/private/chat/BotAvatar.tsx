import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

const BotAvatar = () => {
  return (
    <Avatar>
      <AvatarFallback>
        <Bot className="size-5" />
      </AvatarFallback>
    </Avatar>
  );
};

export default BotAvatar;
