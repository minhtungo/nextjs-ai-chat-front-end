"use client";

import Typography from "@/components/ui/typography";
import { useChatInfo } from "@/data/queries/use-chat-info";
import { useParams } from "next/navigation";

const HeaderTitle = () => {
  const { id: chatId } = useParams<{ id: string }>();

  const { data } = useChatInfo(chatId);

  return (
    <Typography tag="h1" variant="h5" className="font-normal capitalize">
      {data?.chat.title ?? "Dashboard"}
    </Typography>
  );
};

export default HeaderTitle;
