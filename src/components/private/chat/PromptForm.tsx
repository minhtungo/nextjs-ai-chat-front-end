"use client";

import { ArrowUp, ChevronDown } from "lucide-react";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";

import UploadedFiles from "@/components/private/chat/UploadedFiles";
import UtilButtons from "@/components/private/chat/UtilButtons";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { useMessage } from "@/hooks/use-message";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// const MathKeyboard = dynamic(() => import("./MathKeyboard"), {
//   loading: () => <p>Loading...</p>,
// });

interface PromptFormProps {
  className?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const PromptForm: FC<PromptFormProps> = ({ className, onSubmit }) => {
  const { formRef, onKeyDown } = useEnterSubmit();
  const [showMathKeyboard, setShowMathKeyboard] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // const isSubscribed = useAtomValue(isSubscribedAtom);

  const {
    message: { content },
    setMessage,
    addFiles,
    inTokenLimit,
    pending,
  } = useMessage();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      className="relative overflow-hidden"
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      {!showMathKeyboard ? (
        <div
          className={cn(
            "relative flex w-full items-end gap-2 rounded-3xl bg-accent p-2.5",
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
          <UtilButtons
            showMathKeyboard={showMathKeyboard}
            setShowMathKeyboard={setShowMathKeyboard}
          />

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
              className={cn(
                "max-h-48 min-h-0 w-full resize-none self-center bg-transparent py-1 text-sm focus-within:outline-none",
              )}
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
          <Button
            size="icon"
            type="submit"
            className="size-7 rounded-full bg-primary text-primary-foreground disabled:cursor-not-allowed disabled:opacity-70"
            disabled={content.trim() === "" || pending || !inTokenLimit}
          >
            <ArrowUp className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      ) : (
        <>
          <button
            className="absolute -top-[10px] left-1/2 size-5 rounded-full bg-accent p-1"
            onClick={() => setShowMathKeyboard(false)}
          >
            <ChevronDown className="size-3" />
          </button>

          {/* <div className="w-full" id="math-keyboard">
            <MathKeyboard formRef={formRef} />
          </div> */}
        </>
      )}
    </form>
  );
};

export default PromptForm;
