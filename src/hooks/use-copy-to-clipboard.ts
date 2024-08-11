"use client";

import { useCallback, useState } from "react";

export interface useCopyToClipboardProps {
  timeout?: number;
}

export function useCopyToClipboard({
  timeout = 2000,
}: useCopyToClipboardProps) {
  const [isCopied, setIsCopied] = useState<Boolean>(false);

  const copyToClipboard = useCallback(
    (value: string) => {
      if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
        return;
      }

      if (!value) {
        return;
      }

      navigator.clipboard.writeText(value).then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, timeout);
      });
    },
    [timeout],
  );

  return { isCopied, copyToClipboard };
}
