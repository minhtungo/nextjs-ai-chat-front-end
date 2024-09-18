"use client";

import { ArrowUp, ChevronDown, Paperclip, SendHorizonal } from "lucide-react";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";

import UploadedFiles from "@/components/private/chat/UploadedFiles";
import UtilButtons from "@/components/private/chat/UtilButtons";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { useMessage } from "@/hooks/use-message";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Formula from "@/components/icons/Formula";

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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                type="submit"
                variant="ghost"
                className="!rounded-full"
                asChild
                // disabled={content.trim() === "" || pending || !inTokenLimit}
              >
                <label
                  htmlFor="attach-file"
                  className="relative flex cursor-pointer select-none items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <Paperclip className="pointer-events-none size-[18px]" />
                </label>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Attach files</TooltipContent>
          </Tooltip>
          <input
            type="file"
            accept="image/*, .pdf, .doc, .docx"
            className="hidden"
            multiple
            id="attach-file"
            onChange={async (e) => {
              const files = e.target.files;
              if (files) {
                addFiles(Array.from(files));
              }
            }}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                type="submit"
                variant="ghost"
                className="!rounded-full"
                onClick={() => setShowMathKeyboard(!showMathKeyboard)}
              >
                <Formula className="size-[18px]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Math Equation</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                type="submit"
                variant="ghost"
                className={cn(
                  "transition-all duration-300 ease-in-out hover:rounded-full",
                  content.trim() === ""
                    ? "-mr-10 scale-0 opacity-0"
                    : "scale-100 opacity-100",
                )}
                // disabled={content.trim() === "" || pending || !inTokenLimit}
              >
                <SendHorizonal className="size-[18px]" />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Submit</TooltipContent>
          </Tooltip>
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
