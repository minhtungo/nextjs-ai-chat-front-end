import { useChat } from "@/features/chat/store/use-chat";
import { useMessages } from "@/features/chat/store/use-messages";
import { Message } from "@/lib/definitions";
import { InfiniteMessagePage } from "@/features/chat/types";
import { useEffect, useMemo } from "react";

type usePreviewsProps<T> = {
  pages?: T[];
};

export const usePreviews = <T extends InfiniteMessagePage["pages"]>({
  pages,
}: usePreviewsProps<T>): Message[] => {
  console.log("usePreviews", pages);
  const { setMessages } = useMessages();
  const { chatId } = useChat();

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
