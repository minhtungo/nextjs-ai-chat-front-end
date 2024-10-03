"use client";

import { useEffect, useRef } from "react";
import Textarea from "react-textarea-autosize";

import MathKeyboardContainer from "@/components/chat/MathKeyboardContainer";
import PromptActions from "@/components/chat/PromptActions";
import UploadedFiles from "@/components/chat/UploadedFiles";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { useMessage } from "@/hooks/use-message";
import { cn } from "@/lib/utils";

interface PromptFormProps {
  className?: string;
  onSubmit: () => void;
}

const PromptForm = ({ className, onSubmit }: PromptFormProps) => {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    addFiles,
    message: { content },
    setMessage,
  } = useMessage();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <MathKeyboardContainer formRef={formRef} className="peer" />
      <form
        className={cn(
          "relative overflow-hidden peer-[[data-state=open]]:hidden",
        )}
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div
          className={cn(
            "relative flex w-full items-end gap-2 rounded-3xl bg-secondary py-1.5 pl-6 pr-4",
            className,
          )}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={async (e) => {
            const files = e.dataTransfer?.files;
            if (e.dataTransfer?.files) {
              e.preventDefault();
              const lastItem = Array.from(files)[files.length - 1];
              addFiles([lastItem]);
            }
          }}
        >
          <div className="flex flex-1 flex-col gap-y-2">
            <UploadedFiles />
            <Textarea
              ref={inputRef}
              tabIndex={0}
              onPaste={async (e) => {
                const files = e.clipboardData?.files;
                if (files && files.length > 0) {
                  e.preventDefault();
                  addFiles(Array.from(files));
                }
              }}
              onKeyDown={onKeyDown}
              placeholder="Ask Lumi anything..."
              className="max-h-48 min-h-0 w-full resize-none self-center bg-transparent py-1.5 text-sm focus-within:outline-none"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              name="message"
              rows={1}
              value={content}
              onChange={(e) =>
                setMessage((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </div>

          <PromptActions />
        </div>
      </form>
    </TooltipProvider>
  );
};

export default PromptForm;
