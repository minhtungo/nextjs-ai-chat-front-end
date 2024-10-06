import { useChatInfo } from "@/hooks/use-chat-info";
import { useMessages } from "@/hooks/use-messages";
import { Message } from "@/lib/definitions";
import { InfiniteMessagePage } from "@/types/chat";
import { useEffect, useMemo } from "react";

type usePreviewsProps<T> = {
  pages?: T[];
};

export const usePreviews = <T extends InfiniteMessagePage["pages"]>({
  pages,
}: usePreviewsProps<T>): Message[] => {
  console.log("usePreviews", pages);
  const { setMessages } = useMessages();
  const { chatId } = useChatInfo();

  if (!pages || pages.length === 0 || pages[0]?.messages.length === 0)
    return [];

  const messages = useMemo(
    () =>
      pages
        .toReversed()
        .flatMap((page) =>
          Array.isArray(page?.messages) ? page.messages : [],
        ),
    [pages],
  );

  useEffect(() => {
    setMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
    }
  }, [chatId]);

  return messages;
};
