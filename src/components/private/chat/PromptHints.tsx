import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { FC } from "react";

interface PromptSuggestionProps {
  className?: string;
}

const promptSuggestion = [
  {
    title: "Tell me more about solving simple equations.",
  },
  {
    title: "How do I work with variables in equations?",
  },
  {
    title: "What is the difference between linear and quadratic equations?",
  },
];

const PromptHints: FC<PromptSuggestionProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "grid max-w-[70%] grid-cols-3 gap-3 break-words text-sm text-muted-foreground",
        className,
      )}
    >
      {promptSuggestion.map(({ title }) => (
        <button
          key={`${title}-prompt-hint`}
          className="rounded-lg border bg-card px-3 py-2 text-left shadow-sm hover:bg-accent"
        >
          <p>{title}</p>
        </button>
      ))}
    </div>
  );
};

export default PromptHints;
