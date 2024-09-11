import Typography from "@/components/ui/typography";
import { getChatInfo } from "@/data/chat";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface ChatHeaderTitleProps {
  className?: string;
  chatId?: string;
}

const ChatHeaderTitle: FC<ChatHeaderTitleProps> = async ({
  chatId,
  className,
}) => {
  const chat = await getChatInfo(chatId);

  return (
    <Typography
      className={cn(
        "overflow-hidden text-ellipsis font-normal capitalize",
        className,
      )}
    >
      {chat ? chat.title : "Dashboard"}
    </Typography>
  );
};

export default ChatHeaderTitle;
