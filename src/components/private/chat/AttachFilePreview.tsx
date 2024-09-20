import Pdf from "@/components/icons/Pdf";
import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import Image from "next/image";

interface AttachFilePreviewProps {
  type: "document" | "pdf" | "image";
  name: string;
  url: string;
  className?: string;
}

const AttachFilePreview = ({
  type,
  name,
  url,
  className,
}: AttachFilePreviewProps) => {
  const { updateDocIndex, updateImageIndex } = useChat();

  return (
    <div
      className={cn(
        "flex w-full items-center gap-x-2 overflow-hidden rounded-lg p-1.5 hover:cursor-pointer hover:bg-accent/80",
        className,
      )}
      onClick={() => {
        if (type !== "image") {
          updateDocIndex(url);
        } else {
          updateImageIndex(url);
        }
      }}
    >
      {type === "document" && <FileText className="size-5" />}
      {type === "pdf" && <Pdf className="size-5" />}
      {type === "image" && (
        <Image
          width={20}
          height={20}
          className="size-5"
          src={url!}
          alt={name}
        />
      )}
      <div className="w-full overflow-hidden text-ellipsis text-sm">{name}</div>
    </div>
  );
};

export default AttachFilePreview;
