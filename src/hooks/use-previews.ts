import { useMessages } from "@/hooks/use-messages";
import { Message } from "@/lib/definitions";
import { InfiniteMessagePage } from "@/types/chat";
import { useEffect, useMemo } from "react";

type usePreviewsProps<T> = {
  pages?: T[];
  chatId?: string;
};

export const usePreviews = <T extends InfiniteMessagePage["pages"]>({
  pages,
  chatId,
}: usePreviewsProps<T>): Message[] => {
  console.log("usePreviews", pages);
  const { setMessages } = useMessages();

  if (!pages || pages.length === 0) return [];

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
    if (messages.length > 0) {
      setMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    console.log("useEffect chatId");
    if (!chatId) {
      setMessages([]);
    }
  }, [chatId]);

  return messages;
};
