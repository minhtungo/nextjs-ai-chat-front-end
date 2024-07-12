"use client";

import { ChevronDown, CornerDownLeft, X } from "lucide-react";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useEnterSubmit } from "@/hooks/use-enter-submit";

import { Card } from "@/components/ui/card";
import { cn, handlePastedFiles, handleUploadedFiles } from "@/lib/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useFiles, useMessage } from "../use-message";
import UtilButtons from "./UtilButtons";
import { ScrollArea } from "@/components/ui/scroll-area";

const MathKeyboard = dynamic(() => import("./MathKeyboard"), {
  loading: () => <p>Loading...</p>,
});

interface PromptFormProps {
  className?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const PromptForm: FC<PromptFormProps> = ({ className, onSubmit }) => {
  const { formRef, onKeyDown } = useEnterSubmit();
  const [showMathKeyboard, setShowMathKeyboard] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    files: [files, setFiles],
  } = useFiles();

  const {
    message: [message, setMessage],
  } = useMessage();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  console.log(files);

  return (
    <form className="relative" ref={formRef} onSubmit={onSubmit}>
      {!showMathKeyboard ? (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring",
            className,
          )}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            const fileArray = handleUploadedFiles(e) as File[];
            if (!fileArray || fileArray.length === 0) {
              return;
            }
            setFiles((currentFiles) => [...currentFiles, ...fileArray]);
          }}
        >
          <div className="flex w-full items-end gap-1.5 p-1 lg:gap-3.5">
            <div className="flex items-end gap-1.5">
              <UtilButtons
                showMathKeyboard={showMathKeyboard}
                setShowMathKeyboard={setShowMathKeyboard}
              />
            </div>
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>

            <div className="mr-1.5 flex min-h-8 w-full flex-1 flex-col items-start justify-center gap-y-3 overflow-hidden py-2 lg:min-h-9">
              {files && files.length > 0 && (
                <div className="relative mb-1 flex w-full flex-nowrap gap-3 overflow-x-auto overflow-y-visible py-1.5">
                  {files.map((file, index) => (
                    <div className="relative">
                      {file.type.startsWith("image") ? (
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="Image"
                          width={56}
                          height={56}
                          className="peer aspect-square min-h-14 min-w-14 rounded-sm object-cover"
                        />
                      ) : (
                        <Card className="h-14 w-full max-w-[450px] overflow-hidden border-border bg-muted/40 p-2 pr-4 sm:p-2 sm:pr-6">
                          <div className="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                            {file.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Document
                          </div>
                        </Card>
                      )}
                      <button
                        className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-secondary p-1 opacity-70 transition-opacity hover:opacity-100"
                        onClick={() => {
                          setFiles((prevFiles) =>
                            prevFiles.filter((_, idx) => idx !== index),
                          );
                        }}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove attached file</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <Textarea
                ref={inputRef}
                tabIndex={0}
                onPaste={(event) => {
                  const file = handlePastedFiles(event);
                  if (file) {
                    setFiles((currentFiles) => [...currentFiles, file]);
                    event.preventDefault();
                  }
                }}
                onKeyDown={onKeyDown}
                placeholder="Send a message"
                className="max-h-48 min-h-0 w-full resize-none bg-transparent text-sm focus-within:outline-none"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                name="message"
                rows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              type="submit"
              size="icon"
              className="ml-auto gap-1.5"
              disabled={
                !message && message.trim() === "" && files?.length === 0
              }
            >
              <CornerDownLeft className="size-3.5" />
              <span className="sr-only">Send message</span>
            </Button>
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

          <div className="w-full" id="math-keyboard">
            <MathKeyboard formRef={formRef} />
          </div>
        </>
      )}
    </form>
  );
};

export default PromptForm;
