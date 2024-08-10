import Spinner from "@/components/common/Spinner";
import { MessageSquareShare } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface ImagePreviewProps {
  src: string;
  path: string;
  isLoading: boolean;
  onClick?: () => void;
  isOverlayOpen: boolean;
}

const ImagePreview: FC<ImagePreviewProps> = ({
  src,
  path,
  onClick,
  isOverlayOpen,
  isLoading,
}) => {
  return (
    <div
      role={!isOverlayOpen ? "button" : "img"}
      className="relative aspect-square max-h-40 overflow-hidden rounded-lg border"
      onClick={onClick}
    >
      {isLoading && (
        <div className="flex size-40 items-center justify-center rounded-lg">
          <Spinner />
        </div>
      )}
      {src && (
        <>
          <Image
            src={src}
            height={300}
            width={300}
            alt={path}
            className="h-full max-h-40 w-full rounded-lg object-cover"
          />
          {!isOverlayOpen && (
            <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-accent/50 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
              <MessageSquareShare className="size-4 sm:size-5" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImagePreview;
