import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface PromptSuggestionProps {
  className?: string;
}

const promptSuggestion = [
  {
    title: "What is the capital of France?",
    description: "Paris",
  },
  {
    title: "What is the capital of Germany?",
    description: "Berlin",
  },
  {
    title: "What is the capital of Italy?",
    description: "Rome",
  },
  {
    title: "What is the capital of Vietnam?",
    description: "Ha noi",
  },
];

const PromptSuggestions: FC<PromptSuggestionProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-3 text-sm transition-colors",
        className,
      )}
    >
      {promptSuggestion.map(({ title, description }) => (
        <button
          key={`${title}-prompt-suggestion`}
          className="rounded-lg border bg-secondary/40 p-2 text-left text-card-foreground shadow-sm sm:px-3 sm:py-2"
        >
          <p>{title}</p>
        </button>
      ))}
    </div>
  );
};

export default PromptSuggestions;
