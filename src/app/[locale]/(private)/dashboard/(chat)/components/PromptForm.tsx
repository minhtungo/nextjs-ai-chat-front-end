"use client";

import {
  ArrowDown,
  ChevronDown,
  CornerDownLeft,
  Paperclip,
  X,
} from "lucide-react";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Textarea from "react-textarea-autosize";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useEnterSubmit } from "@/hooks/use-enter-submit";

import { cn } from "@/lib/utils";
import Image from "next/image";
import UtilButtons from "./UtilButtons";
import dynamic from "next/dynamic";
import { useMessage } from "../use-message";

const MathKeyboard = dynamic(() => import("./MathKeyboard"), {
  loading: () => <p>Loading...</p>,
});

interface PromptFormProps {
  className?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}

const PromptForm: FC<PromptFormProps> = ({
  className,
  onSubmit,
  file,
  setFile,
}) => {
  const { formRef, onKeyDown } = useEnterSubmit();
  const [showMathKeyboard, setShowMathKeyboard] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [message, setMessage] = useMessage();

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
            "relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring",
            className,
          )}
        >
          <div className="flex w-full items-end gap-1.5 p-1 lg:gap-3.5">
            <div className="flex items-end gap-1.5">
              <UtilButtons
                setFile={setFile}
                showMathKeyboard={showMathKeyboard}
                setShowMathKeyboard={setShowMathKeyboard}
              />
            </div>
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>

            <div className="mr-1.5 flex min-h-8 w-full flex-1 flex-col items-start justify-center gap-y-3 py-2 lg:min-h-9">
              {file && (
                <div className="relative flex flex-nowrap gap-2 overflow-visible">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Image"
                    width={56}
                    height={56}
                    className="rounded-sm"
                  />
                  <button
                    className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-secondary p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
                    onClick={() => {
                      setFile(undefined);
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove attached image</span>
                  </button>
                </div>
              )}
              <Textarea
                ref={inputRef}
                tabIndex={0}
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
              disabled={!message || message.trim() === ""}
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
