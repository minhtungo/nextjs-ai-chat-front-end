"use client";

import { useMessages } from "@/features/chat/store/use-messages";
import { useSubscription } from "@/features/chat/store/use-subscription";
import { createNewMessageStore } from "@/lib/chat";
import { cn } from "@/lib/utils";

interface PromptSuggestionProps extends React.ComponentProps<"div"> {
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
  {
    content: "How do I work with variables in equations 3?",
  },
];

const PromptHints = ({ userId, className }: PromptSuggestionProps) => {
  const { subscription } = useSubscription();
  const { setMessages } = useMessages();

  const publishMessage = async (content: string) => {
    const newMessage = createNewMessageStore({
      content,
      userId,
    });

    setMessages((prev) => [...prev, newMessage]);

    if (subscription) {
      subscription.publish({
        input: {
          content,
        },
      });
    }
  };

  return (
    <div
      className={cn(
        "grid gap-3 break-words text-sm text-muted-foreground transition-colors sm:grid-cols-4",
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
