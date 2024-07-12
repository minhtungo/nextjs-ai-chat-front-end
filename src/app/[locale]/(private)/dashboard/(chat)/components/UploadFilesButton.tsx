import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Paperclip } from "lucide-react";
import { FC } from "react";
import { useFiles } from "../use-message";
import { Input } from "@/components/ui/input";

interface UploadFilesButtonProps {}

const UploadFilesButton: FC<UploadFilesButtonProps> = () => {
  const { setFiles } = useFiles();

  return (
    <>
      <DropdownMenuItem asChild>
        <label
          htmlFor="attach-file"
          className="relative flex cursor-pointer select-none items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        >
          <Paperclip className="pointer-events-none size-3.5" />
          <span>Attach file</span>
        </label>
      </DropdownMenuItem>
      <Input
        type="file"
        accept="image/*"
        className="hidden"
        id="attach-file"
        onChange={(e) => {
          console.log("hello---------");
          if (e.target.files?.length) {
            const fileArray = Array.from(e.target?.files);
            setFiles(fileArray);
          }
        }}
      />
    </>
  );
};

export default UploadFilesButton;
