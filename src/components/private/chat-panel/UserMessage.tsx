import { FC } from "react";

import ImagePreview from "@/components/private/chat-panel/ImagePreview";
import { Card } from "@/components/ui/card";
import { chatStore } from "@/store/chat";
import { Message } from "@/types/chat";
import DocPreview from "./DocPreview";

interface UserMessageProps {
  message: Message;
}

const UserMessage: FC<UserMessageProps> = ({ message: { content, files } }) => {
  const { getChat: chat, chatImagesArray, updateChatOverlay } = chatStore();

  const onImageClick = (url: string) => {
    if (!chat.overlay.isOpen) {
      updateChatOverlay({
        isOpen: true,
        selectedImageIndex: chatImagesArray.findIndex(
          (image) => image.url === url,
        ),
      });
    }
  };
  const messageDocsArray = files.filter((file) => file.type === "document");

  const messageImagesArray = files.filter((file) => file.type === "image");

  return (
    <div className="space-y-2">
      <div className="mt-3 flex flex-col items-end gap-3">
        {messageImagesArray.length > 0 && (
          <div className="flex max-w-72 flex-row flex-wrap items-center justify-end gap-3">
            {messageImagesArray.map(({ url }) => (
              <ImagePreview
                key={url}
                url={url!}
                isOverlayOpen={chat.overlay.isOpen}
                onClick={() => onImageClick(url!)}
              />
            ))}
          </div>
        )}
        {messageDocsArray.length > 0 && (
          <div className="flex max-w-72 flex-row flex-wrap items-center justify-end gap-1">
            {messageDocsArray.map(({ name }) => (
              <DocPreview name={name} />
            ))}
          </div>
        )}
      </div>
      <Card className="ml-auto w-fit bg-secondary p-2 text-right sm:px-3 sm:py-2">
        {content}
      </Card>
    </div>
  );
};

export default UserMessage;
