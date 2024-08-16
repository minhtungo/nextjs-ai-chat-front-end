import { Message } from "@/lib/definitions";
import { InfiniteMessagePage } from "@/types/chat";
import { useMemo } from "react";

type usePreviewsProps<T> = {
  pages?: T[];
};

export const usePreviews = <T extends InfiniteMessagePage["pages"]>({
  pages,
}: usePreviewsProps<T>): Message[] => {
  const messages = useMemo(() => {
    if (!pages) return [];
    const messages = pages.toReversed().flatMap((page) => page.messages);
    return messages;
  }, [pages]);

  return messages;
};
