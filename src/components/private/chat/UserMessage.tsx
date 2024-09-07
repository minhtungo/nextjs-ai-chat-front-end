import { FC } from "react";

import DocPreview from "@/components/private/chat/DocPreview";
import ImagePreviews from "@/components/private/chat/ImagePreviews";
import { Card } from "@/components/ui/card";
import { MessageStore } from "@/types/chat";

interface UserMessageProps {
  message: MessageStore;
}

const UserMessage: FC<UserMessageProps> = ({
  message: { content, images, docs, id },
}) => {
  console.log("UserMessage", images, docs);

  return (
    <>
      <div className="flex w-full flex-col items-end gap-y-3 empty:hidden">
        {images && images.length > 0 && (
          <div className="flex max-w-[70%] flex-row flex-wrap items-center justify-end gap-2">
            <ImagePreviews images={images} />
          </div>
        )}
        {docs && docs.length > 0 && (
          <div className="flex max-w-72 flex-row flex-wrap items-center justify-end gap-1">
            {docs.map(({ name, type, url }) => (
              <DocPreview name={name} type={type} key={`${id}-${name}-doc`} />
            ))}
          </div>
        )}
        <Card className="relative max-w-[70%] break-words bg-secondary p-2 text-left sm:px-3 sm:py-2">
          <div className="leading-relaxed">{content}</div>
        </Card>
      </div>
    </>
  );
};

export default UserMessage;
