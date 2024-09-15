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
    setMessages([
      {
        id: "123",
        content: "123",
        docs: [],
        images: [],
        timestamp: 0,
        userId: "123",
      },
    ]);
  }, [messages]);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
    }
  }, [chatId]);

  return messages;
};
