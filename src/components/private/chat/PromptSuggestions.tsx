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
    content: "What is the capital of France?",
  },
  {
    content: "What is the capital of Germany?",
  },
  {
    content: "What is the capital of Italy?",
  },
];

const PromptSuggestions: FC<PromptSuggestionProps> = ({
  className,
  userId,
}) => {
  const sub = useAtomValue(currentSubscriptionAtom);
  const { messages, setMessages } = useMessages();

  if (messages.length < 4) return null;

  const publishMessage = async (content: string) => {
    const newMessage = createNewMessageStore({ content, userId });

    setMessages((prev) => [...prev, newMessage]);

    if (sub) {
      sub.publish({
        input: {
          content,
        },
      });
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-3 text-sm transition-colors",
        className,
      )}
    >
      {promptSuggestion.map(({ content }) => (
        <button
          key={`${content}-prompt-suggestion`}
          className="rounded-lg border bg-secondary/40 p-2 text-left text-card-foreground shadow-sm hover:bg-secondary sm:px-3 sm:py-2"
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

export default PromptSuggestions;
