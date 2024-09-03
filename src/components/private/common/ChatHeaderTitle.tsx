"use client";

import Typography from "@/components/ui/typography";
import { useChatInfo } from "@/data/queries/use-chat-info";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { FC } from "react";

interface ChatHeaderTitleProps {
  className?: string;
}

const ChatHeaderTitle: FC<ChatHeaderTitleProps> = ({ className }) => {
  const { id: chatId } = useParams<{ id: string }>();

  const { data } = useChatInfo(chatId);

  return (
    <Typography
      tag="h1"
      variant="h5"
      className={cn("font-normal capitalize", className)}
    >
      {data?.chat.title ?? "Dashboard"}
    </Typography>
  );
};

export default ChatHeaderTitle;
