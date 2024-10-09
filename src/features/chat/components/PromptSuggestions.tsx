import { useChat } from "@/features/chat/store/use-chat";
import { useMessages } from "@/features/chat/store/use-messages";
import { useSubscription } from "@/features/chat/store/use-subscription";
import { createNewMessageStore } from "@/lib/chat";
import { cn } from "@/lib/utils";

interface PromptSuggestionProps {
  className?: string;
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

const PromptSuggestions = ({ className }: PromptSuggestionProps) => {
  const { subscription } = useSubscription();
  const { chatUserId: userId } = useChat();
  const { messages, setMessages } = useMessages();

  if (messages.length < 4) return null;

  const publishMessage = async (content: string) => {
    const newMessage = createNewMessageStore({ content, userId });

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
        "flex flex-nowrap gap-3 overflow-auto pb-[2px] text-sm transition-colors",
        className,
      )}
    >
      {promptSuggestion.map(({ content }) => (
        <button
          key={`${content}-prompt-suggestion`}
          className="shrink-0 rounded-lg border bg-secondary/40 p-2 text-left text-card-foreground shadow-sm hover:bg-secondary sm:flex-1 sm:px-3 sm:py-2"
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
