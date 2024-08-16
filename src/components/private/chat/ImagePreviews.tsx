import { FC } from "react";

import ImagePreview from "@/components/private/chat/ImagePreview";
import { useMessageImages } from "@/data/queries/use-message-images";
import { FileAtom } from "@/types/file";

interface ImagePreviewsProps {
  images: FileAtom[];
}

const ImagePreviews: FC<ImagePreviewsProps> = ({ images }) => {
  const imagesQueries = useMessageImages(
    (images ?? []).map((image) => image.url!),
  );

  return (
    <>
      {imagesQueries?.map(({ data, isLoading }, index) => {
        return (
          <ImagePreview
            src={data?.imageSrc}
            key={`${data?.path}-${index}`}
            thumbnail={images[index].thumbnail}
            url={data?.url}
            preview={images[index].preview}
            path={data?.path!}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};

export default ImagePreviews;
