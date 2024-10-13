import { Paperclip, SendHorizonal } from "lucide-react";

import Hint from "@/components/common/Hint";
import Formula from "@/components/icons/Formula";
import { Button } from "@/components/ui/button";
import { useMessage } from "@/features/chat/store/use-message";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface PromptActionsProps {}

const PromptActions = ({}: PromptActionsProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const { addFiles, inTokenLimit, pending, setMathMode } = useMessage();

  return (
    <>
      <Hint label="Attach files">
        <Button
          size="icon"
          type="submit"
          variant="ghost"
          className="!rounded-full"
          onClick={() => fileRef.current?.click()}
        >
          <Paperclip className="pointer-events-none size-[18px]" />
        </Button>
      </Hint>
      <Hint label="Math Equation">
        <Button
          size="icon"
          type="submit"
          variant="ghost"
          className="!rounded-full"
          onClick={() => setMathMode((prev) => !prev)}
        >
          <Formula className="size-[18px]" />
        </Button>
      </Hint>
      <Hint label="Submit">
        <Button
          size="icon"
          type="submit"
          variant="ghost"
          className={cn(
            "transition-all duration-300 ease-in-out hover:rounded-full",
          )}
          disabled={pending || !inTokenLimit}
        >
          <SendHorizonal className="size-[18px]" />
          <span className="sr-only">Send message</span>
        </Button>
      </Hint>
      <input
        ref={fileRef}
        type="file"
        accept="image/*, .pdf, .doc, .docx"
        className="hidden"
        multiple
        id="attach-files"
        onChange={async (e) => {
          const files = e.target.files;
          if (files) {
            addFiles(Array.from(files));
          }
        }}
      />
    </>
  );
};

export default PromptActions;
