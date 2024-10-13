"use client";

import { useRef } from "react";
import Textarea from "react-textarea-autosize";

import MathKeyboardContainer from "@/features/chat/components/MathKeyboardContainer";
import PromptActions from "@/features/chat/components/PromptActions";
import UploadedFiles from "@/features/chat/components/UploadedFiles";
import { useMessage } from "@/features/chat/store/use-message";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { cn } from "@/lib/utils";

interface PromptFormProps extends React.ComponentProps<"form"> {
  onSubmitMessage: (content: string) => void;
}

const PromptForm = ({ className, onSubmitMessage }: PromptFormProps) => {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { addFiles } = useMessage();

  return (
    <>
      <MathKeyboardContainer
        formRef={formRef}
        inputRef={inputRef}
        className="peer"
      />
      <form
        className={cn(
          "relative overflow-hidden peer-[[data-state=open]]:hidden",
        )}
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitMessage(inputRef.current?.value!);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
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
              placeholder="Ask Lumi..."
              className="max-h-48 min-h-0 w-full resize-none self-center bg-transparent py-1.5 text-sm focus-within:outline-none"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              name="message"
              rows={1}
            />
          </div>

          <PromptActions />
        </div>
      </form>
    </>
  );
};

export default PromptForm;
