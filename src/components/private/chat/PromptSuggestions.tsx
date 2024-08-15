import { useChat } from "@/hooks/use-chat";
import { createNewMessageStore } from "@/lib/chat";
import { cn } from "@/lib/utils";
import { useSub } from "@/store/centrifuge";
import { Subscription } from "centrifuge";
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
  const { setMessages, messages } = useChat();
  const sub = useSub();

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
