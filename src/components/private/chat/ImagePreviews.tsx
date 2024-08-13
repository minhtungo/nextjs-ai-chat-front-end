import { FC } from "react";

import ImagePreview from "@/components/private/chat/ImagePreview";
import { useMessageImages } from "@/data/queries/use-message-images";
import { chatStore } from "@/store/chat";
import { IFile } from "@/types/chat";

interface ImagePreviewsProps {
  images: IFile[];
}

const ImagePreviews: FC<ImagePreviewsProps> = ({ images }) => {
  const {
    chat: { selectedImageIndex },
    chatImages,
    setChat,
  } = chatStore();

  const onImageClick = (url: string) => {
    if (!selectedImageIndex) {
      setChat((prevState) => ({
        ...prevState,
        selectedImageIndex: chatImages.findIndex((image) => image!.url === url),
      }));
    }
  };

  const imagesQueries = useMessageImages(
    (images ?? []).map((image) => image.url!),
  );

  return (
    <>
      {imagesQueries?.map(({ data, isLoading }, index) => {
        return (
          <ImagePreview
            key={data?.path}
            src={data?.imageSrc}
            thumbnail={images[index].thumbnail}
            preview={images[index].preview}
            path={data?.path!}
            isLoading={isLoading}
            isOverlayOpen={selectedImageIndex !== null}
            onClick={() => onImageClick(data?.url!)}
          />
        );
      })}
    </>
  );
};

export default ImagePreviews;
