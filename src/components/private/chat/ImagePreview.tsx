import { MessageSquareShare } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface ImagePreviewProps {
  url: string;
  onClick?: () => void;
  isOverlayOpen: boolean;
}

const ImagePreview: FC<ImagePreviewProps> = ({
  url,
  onClick,
  isOverlayOpen,
}) => {
  return (
    <div
      role={!isOverlayOpen ? "button" : "img"}
      className="relative max-h-40 overflow-hidden rounded-lg border border-border"
      onClick={onClick}
    >
      <Image
        src={url!}
        height={300}
        width={300}
        alt={`${url}-image-message`}
        className="max-h-40 w-full rounded-lg"
      />
      {!isOverlayOpen && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-accent/50 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
          <MessageSquareShare className="size-5" />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
