import { FC } from "react";

import ImagePreview from "@/components/private/chat/ImagePreview";
import { Card } from "@/components/ui/card";
import { chatStore } from "@/store/chat";
import { MessageStore } from "@/types/chat";
import DocPreview from "../chat/DocPreview";
import { getMessageImagesAction } from "@/actions/chat";

interface UserMessageProps {
  message: MessageStore;
}

const UserMessage: FC<UserMessageProps> = ({
  message: { content, images, docs },
}) => {
  const { getChat: chat, chatImagesArray, updateChatOverlay } = chatStore();

  const onImageClick = (url: string) => {
    if (!chat.overlay.isOpen) {
      updateChatOverlay({
        isOpen: true,
        selectedImageIndex: chatImagesArray.findIndex(
          (image) => image!.url === url,
        ),
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-end gap-y-3 empty:hidden">
      {images && images.length > 0 && (
        <div className="flex max-w-[70%] flex-row flex-wrap items-center justify-end gap-2">
          {images.map(({ url }) => (
            <div className="flex flex-col">
              <ImagePreview
                key={url}
                url={url!}
                isOverlayOpen={chat.overlay.isOpen}
                onClick={() => onImageClick(url!)}
              />
              <button
                onClick={async () => {
                  await getMessageImagesAction({
                    imagePath: url!,
                  });
                }}
              >
                Test
              </button>
            </div>
          ))}
        </div>
      )}
      {docs && docs.length > 0 && (
        <div className="flex max-w-72 flex-row flex-wrap items-center justify-end gap-1">
          {docs.map(({ name, type }) => (
            <DocPreview name={name} type={type} />
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
