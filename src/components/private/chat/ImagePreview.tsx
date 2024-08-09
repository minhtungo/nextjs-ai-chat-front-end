import Spinner from "@/components/common/Spinner";
import { chatStore } from "@/store/chat";
import { getMessageImagesUseCase } from "@/use-cases/chat";
import { MessageSquareShare } from "lucide-react";
import Image from "next/image";
import { FC, memo, useEffect, useState } from "react";

interface ImagePreviewProps {
  url: string;
  onClick?: () => void;
  isOverlayOpen: boolean;
}

const ImagePreview: FC<ImagePreviewProps> = memo(
  ({ url, onClick, isOverlayOpen }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const { cacheImage } = chatStore();

    useEffect(() => {
      const fetchAndSetImage = async () => {
        const cachedImageSrc = await cacheImage(url); 
        setImageSrc(cachedImageSrc); 
      };

      if (url) {
        fetchAndSetImage();
      }
    }, [url]);

    return (
      <div
        role={!isOverlayOpen ? "button" : "img"}
        className="relative aspect-square max-h-40 overflow-hidden rounded-lg border"
        onClick={onClick}
      >
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              height={300}
              width={300}
              alt={imageSrc}
              className="h-full max-h-40 w-full rounded-lg object-cover"
            />
            {!isOverlayOpen && (
              <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-accent/50 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                <MessageSquareShare className="size-4 sm:size-5" />
              </div>
            )}
          </>
        ) : (
          <div className="flex size-40 items-center justify-center rounded-lg">
            <Spinner />
          </div>
        )}
      </div>
    );
  },
);

export default ImagePreview;
