"use client";

import { currentSubscriptionAtom } from "@/atoms/subscription";
import { useMessages } from "@/hooks/use-messages";
import { createNewMessageStore } from "@/lib/chat";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { FC } from "react";

interface PromptSuggestionProps {
  className?: string;
  userId: string;
}

const promptSuggestion = [
  {
    content: "Tell me more about solving simple equations.",
  },
  {
    content: "How do I work with variables in equations?",
  },
  {
    content: "How do I work with variables in equations 2?",
  },
];

const PromptHints: FC<PromptSuggestionProps> = ({ userId, className }) => {
  const currentSubscription = useAtomValue(currentSubscriptionAtom);
  const { setMessages } = useMessages();

  const publishMessage = async (content: string) => {
    const newMessage = createNewMessageStore({
      content,
      userId,
    });

    setMessages((prev) => [...prev, newMessage]);

    if (currentSubscription) {
      currentSubscription.publish({
        input: {
          content,
        },
      });
    }
  };

  return (
    <div
      className={cn(
        "grid gap-3 break-words text-sm text-muted-foreground transition-colors sm:grid-cols-3",
        className,
      )}
    >
      {promptSuggestion.map(({ content }) => (
        <button
          key={`${content}-prompt-hint`}
          className="flex rounded-lg border bg-card px-4 py-3 text-left align-baseline shadow-sm hover:bg-accent"
          onClick={() => {
            publishMessage(content);
          }}
        >
          <p>{content}</p>
        </button>
      ))}
    </div>
  );
};

export default PromptHints;
