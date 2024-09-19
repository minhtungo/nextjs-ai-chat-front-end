import { Paperclip, SendHorizonal } from "lucide-react";

import Formula from "@/components/icons/Formula";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMessage } from "@/hooks/use-message";
import { cn } from "@/lib/utils";

interface PromptActionsProps {}

const PromptActions = ({}: PromptActionsProps) => {
  const {
    message: { content },
    addFiles,
    inTokenLimit,
    pending,
    setMathMode,
  } = useMessage();

  return (
    <>
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
            onClick={() => setMathMode((prev) => !prev)}
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
            disabled={content.trim() === "" || pending || !inTokenLimit}
          >
            <SendHorizonal className="size-[18px]" />
            <span className="sr-only">Send message</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Submit</TooltipContent>
      </Tooltip>
    </>
  );
};

export default PromptActions;
