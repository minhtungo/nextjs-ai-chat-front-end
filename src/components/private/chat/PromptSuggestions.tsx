import { createNewMessageStore } from "@/lib/chat";
import { cn, nanoid } from "@/lib/utils";
import { chatStore } from "@/store/chat";
import { Subscription } from "centrifuge";
import { FC } from "react";

interface PromptSuggestionProps {
  className?: string;
  sub: Subscription | null;
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
  sub,
  userId,
}) => {
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
