import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Paperclip, Plus, Radical } from "lucide-react";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import { useFiles } from "../use-message";
import { handleUploadedFiles, validateFilesOnUpload } from "@/lib/utils";
import { toast } from "sonner";

interface UtilButtonsProps {
  showMathKeyboard: boolean;
  setShowMathKeyboard: Dispatch<SetStateAction<boolean>>;
}

const UtilButtons: FC<UtilButtonsProps> = ({
  showMathKeyboard,
  setShowMathKeyboard,
}) => {
  const { setFiles } = useFiles();

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
        accept="image/*, .pdf, .doc, .docx"
        className="hidden"
        multiple
        id="attach-file"
        onChange={(e) => {
          const fileArray = handleUploadedFiles(e) as File[];
          if (!fileArray || fileArray.length === 0) {
            return;
          }
          setFiles((currentFiles) => [...currentFiles, ...fileArray]);
        }}
      />
    </>
  );
};

export default UtilButtons;
