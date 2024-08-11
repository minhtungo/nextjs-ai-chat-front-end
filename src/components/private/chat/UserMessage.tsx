import { FC } from "react";

import ImagePreview from "@/components/private/chat/ImagePreview";
import { Card } from "@/components/ui/card";
import { chatStore } from "@/store/chat";
import { MessageStore } from "@/types/chat";
import DocPreview from "../chat/DocPreview";
import { useMessageImages } from "@/data/queries/use-message-images";

interface UserMessageProps {
  message: MessageStore;
}

const UserMessage: FC<UserMessageProps> = ({
  message: { content, images, docs, id },
}) => {
  const { chat, chatImages, setChat } = chatStore();

  const onImageClick = (url: string) => {
    if (!chat.selectedImageIndex) {
      setChat((prevState) => ({
        ...prevState,
        selectedImageIndex: chatImages.findIndex((image) => image!.url === url),
      }));
    }
  };

  const imagesQueries = useMessageImages((images ?? []).map(({ url }) => url!));

  return (
    <div className="flex w-full flex-col items-end gap-y-3 empty:hidden">
      {images && images.length > 0 && (
        <div className="flex max-w-[70%] flex-row flex-wrap items-center justify-end gap-2">
          {imagesQueries?.map(({ data, isLoading }) => (
            <ImagePreview
              key={data?.path}
              src={data?.imageSrc!}
              path={data?.path!}
              isLoading={isLoading}
              isOverlayOpen={!!chat.selectedImageIndex}
              onClick={() => onImageClick(data?.url!)}
            />
          ))}
        </div>
      )}
      {docs && docs.length > 0 && (
        <div className="flex max-w-72 flex-row flex-wrap items-center justify-end gap-1">
          {docs.map(({ name, type }) => (
            <DocPreview key={`${id}-${name}-doc`} name={name} type={type} />
          ))}
        </div>
      )}
      <Card className="relative max-w-[70%] break-words bg-secondary p-2 text-left sm:px-3 sm:py-2">
        <div className="leading-relaxed">{content}</div>
      </Card>
    </div>
  );
};

export default UserMessage;
