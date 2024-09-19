"use client";

import { FormEvent, useEffect, useRef } from "react";
import Textarea from "react-textarea-autosize";

import PromptActions from "@/components/private/chat/PromptActions";
import UploadedFiles from "@/components/private/chat/UploadedFiles";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { useMessage } from "@/hooks/use-message";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const MathKeyboard = dynamic(() => import("./MathKeyboard"), {
  loading: () => <p>Loading...</p>,
});

interface PromptFormProps extends React.ComponentProps<"form"> {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const PromptForm = ({ className, onSubmit }: PromptFormProps) => {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    message: { content },
    setMessage,
    addFiles,
    mathMode,
    setMathMode,
  } = useMessage();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <form
        className={cn("relative overflow-hidden", mathMode && "hidden")}
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <div
          className={cn(
            "relative flex w-full items-end gap-2 rounded-3xl bg-accent py-2.5 pl-6 pr-4",
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
      {mathMode && <MathKeyboard formRef={formRef} />}
      <div className="relative">
        {mathMode && (
          <button
            className="absolute -top-[10px] left-1/2 z-[1000] mb-4 size-5 rounded-full bg-accent p-1"
            onClick={() => setMathMode((prev) => !prev)}
          >
            <ChevronDown className="size-3" />
          </button>
        )}
        <div className="w-full" id="math-keyboard" />
      </div>
    </>
  );
};

export default PromptForm;
