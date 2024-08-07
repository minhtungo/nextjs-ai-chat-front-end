import { createNewMessageStore } from "@/lib/chat";
import { cn } from "@/lib/utils";
import { useSub } from "@/store/centrifuge";
import { chatStore } from "@/store/chat";
import { Lightbulb } from "lucide-react";
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
    content: "What is the difference between linear and quadratic equations?",
  },
];

const PromptHints: FC<PromptSuggestionProps> = ({ className, userId }) => {
  const sub = useSub();
  const { setChat } = chatStore();

  const publishMessage = async (content: string) => {
    const newMessage = createNewMessageStore({ content, userId });

    setChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

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
        "grid max-w-[70%] grid-cols-3 gap-3 break-words text-sm text-muted-foreground transition-colors",
        className,
      )}
    >
      {promptSuggestion.map(({ content }) => (
        <button
          key={`${content}-prompt-hint`}
          className="rounded-lg border bg-card p-3 text-left shadow-sm hover:bg-accent"
          onClick={() => {
            publishMessage(content);
          }}
        >
          <Lightbulb className="mb-2 size-4 text-primary" />
          <p>{content}</p>
        </button>
      ))}
    </div>
  );
};

export default PromptHints;
