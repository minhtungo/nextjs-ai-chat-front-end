import { CornerDownLeft, Paperclip } from "lucide-react";
import { FC, useEffect, useRef } from "react";
import Textarea from "react-textarea-autosize";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { AI } from "@/lib/chat/actions";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import UserMessage from "../dashboard/UserMessage";

interface PromptFormProps {
  input: string;
  setInput: (value: string) => void;
}

const PromptForm: FC<PromptFormProps> = ({ input, setInput }) => {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState<typeof AI>();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault();

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target["message"]?.blur();
        }

        const value = input.trim();
        setInput("");
        if (!value) return;

        // Optimistically add user message UI
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>,
          },
        ]);

        // Submit and get response message
        const responseMessage = await submitUserMessage(value);
        setMessages((currentMessages) => [...currentMessages, responseMessage]);
      }}
      className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
    >
      <div className="flex w-full items-center gap-1.5 p-1 lg:gap-3.5">
        <div className="flex items-center gap-1.5">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="size-3.5" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <div className="mr-1.5 flex w-full flex-1">
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Send a message"
            className=" max-h-48 min-h-0 w-full resize-none bg-transparent focus-within:outline-none sm:text-sm"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <Button
          variant="outline"
          type="submit"
          size="icon"
          className="ml-auto gap-1.5"
          disabled={input === ""}
        >
          <CornerDownLeft className="size-3.5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
};

export default PromptForm;
