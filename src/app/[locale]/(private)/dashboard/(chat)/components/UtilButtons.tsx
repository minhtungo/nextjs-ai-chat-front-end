import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Paperclip, Plus, Radical } from "lucide-react";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UtilButtonsProps {
  setFile: Dispatch<SetStateAction<File | undefined>>;
  showMathKeyboard: boolean;
  setShowMathKeyboard: Dispatch<SetStateAction<boolean>>;
}

const UtilButtons: FC<UtilButtonsProps> = ({
  setFile,
  showMathKeyboard,
  setShowMathKeyboard,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("asd", inputRef.current?.files);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="flex"
            type="button"
            onClick={() => setShowMathKeyboard(!showMathKeyboard)}
          >
            <Plus className="pointer-events-none size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="start"
          alignOffset={-4}
          sideOffset={15}
        >
          <DropdownMenuItem asChild>
            <label
              htmlFor="attach-file"
              className="relative flex cursor-pointer select-none items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <Paperclip className="pointer-events-none size-3.5" />
              <span>Attach file</span>
            </label>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowMathKeyboard(!showMathKeyboard)}
          >
            <Radical className="pointer-events-none size-3.5" />
            <span>Write equations</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        id="attach-file"
        onChange={(e) => {
          console.log("hello");
          if (e.target.files?.length) {
            setFile(e.target?.files[0]);
          }
        }}
      />
    </>
  );
};

export default UtilButtons;
