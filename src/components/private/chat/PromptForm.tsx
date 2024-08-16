"use client";

import { ArrowUp, ChevronDown, X } from "lucide-react";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useEnterSubmit } from "@/hooks/use-enter-submit";

import Spinner from "@/components/common/Spinner";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { useMessage } from "@/hooks/use-message";
import UtilButtons from "@/components/private/chat/UtilButtons";
import DocPreview from "@/components/private/chat/DocPreview";

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
    removeFile,
    inTokenLimit,
    files,
    pending,
  } = useMessage();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form className="relative" ref={formRef} onSubmit={onSubmit}>
      {!showMathKeyboard ? (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-accent/60",
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
          <div className="p-2">
            <div className="flex w-full items-center gap-2 lg:gap-3">
              <UtilButtons
                showMathKeyboard={showMathKeyboard}
                setShowMathKeyboard={setShowMathKeyboard}
                className="self-end"
              />
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <div className="flex w-full flex-1 flex-col items-start justify-center gap-y-3 overflow-hidden">
                {files && files.length > 0 && (
                  <div className="relative mb-1 flex w-full flex-nowrap gap-3 overflow-x-auto overflow-y-visible py-1.5">
                    {files.map(({ preview, name, type, isUploading, id }) => (
                      <div
                        className="relative overflow-visible rounded-lg"
                        key={id}
                      >
                        {type === "image" ? (
                          <Image
                            src={preview!}
                            alt="Image"
                            width={60}
                            height={60}
                            className="peer aspect-square min-h-14 min-w-14 rounded-sm object-cover"
                          />
                        ) : (
                          <DocPreview name={name} type={type} />
                        )}
                        <button
                          className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-secondary p-1 opacity-70 transition-opacity hover:opacity-100"
                          onClick={() => {
                            removeFile(id);
                          }}
                        >
                          <X className="size-3" />
                          <span className="sr-only">Remove attached file</span>
                        </button>
                        {isUploading && (
                          <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-background/50 transition duration-300 ease-in-out">
                            <Spinner className="size-3" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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
                  placeholder="Message"
                  className="max-h-48 min-h-0 w-full resize-none bg-transparent text-sm focus-within:outline-none"
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
                variant="default"
                type="submit"
                size="xs"
                className="self-end rounded-full disabled:bg-primary"
                disabled={content.trim() === "" || pending || !inTokenLimit}
              >
                <ArrowUp className="size-3.5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button
            className="absolute -top-[10px] left-1/2 rounded-full bg-accent p-1"
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
