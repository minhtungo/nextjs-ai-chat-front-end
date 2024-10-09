import { useChat } from "@/features/chat/store/use-chat";
import { cn } from "@/lib/utils";
import { MessageSquareShare } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface ImagePreviewProps {
  url: string;
  name: string;
}

const ImagePreview: FC<ImagePreviewProps> = ({ name, url }) => {
  const { selectedImageIndex, updateImageIndex } = useChat();

  return (
    <div
      className={cn(
        "relative aspect-square h-40 w-40 overflow-hidden rounded-lg border",
        selectedImageIndex !== null ? "cursor-default" : "cursor-pointer",
      )}
      onClick={() => updateImageIndex(url)}
    >
      <Image
        src={url}
        alt={name}
        className={cn(
          "h-full w-full rounded-lg object-cover transition-opacity duration-200 ease-in-out",
        )}
        width={500}
        height={500}
      />
      {url && selectedImageIndex === null && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-accent/50 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
          <MessageSquareShare className="size-4 sm:size-5" />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
