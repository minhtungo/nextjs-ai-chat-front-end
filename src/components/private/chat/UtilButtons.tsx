import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useMessage } from "@/hooks/use-message";
import { cn } from "@/lib/utils";
import { Paperclip, Plus, Radical } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

interface UtilButtonsProps {
  showMathKeyboard: boolean;
  setShowMathKeyboard: Dispatch<SetStateAction<boolean>>;
  className?: string;
  disabled?: boolean;
}

const UtilButtons: FC<UtilButtonsProps> = ({
  showMathKeyboard,
  setShowMathKeyboard,
  className,
  disabled,
}) => {
  const { addFiles } = useMessage();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="xs"
            type="button"
            variant="ghost"
            className={cn(className)}
            onClick={() => setShowMathKeyboard(!showMathKeyboard)}
            disabled={disabled}
          >
            <Plus className="size-4 text-muted-foreground" />
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
              <span>Attach files</span>
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
    </>
  );
};

export default UtilButtons;
