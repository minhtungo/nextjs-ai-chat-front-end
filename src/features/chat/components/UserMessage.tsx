import { Card } from "@/components/ui/card";
import DocPreview from "@/features/chat/components/DocPreview";
import ImagePreview from "@/features/chat/components/ImagePreview";
import { MessageStore } from "@/features/chat/types";

interface UserMessageProps {
  message: MessageStore;
}

const UserMessage = ({
  message: { content, images, docs, id },
}: UserMessageProps) => {
  return (
    <div className="flex w-full flex-col items-end gap-y-3 text-sm leading-7 empty:hidden">
      {images && images.length > 0 && (
        <div className="flex max-w-[70%] flex-row flex-wrap items-center justify-end gap-2">
          {images.map(({ name, url }) => (
            <ImagePreview key={`${name}-image`} url={url!} name={name} />
          ))}
        </div>
      )}
      {docs && docs.length > 0 && (
        <div className="flex max-w-72 flex-row flex-wrap items-center justify-end gap-1">
          {docs.map(({ name, type, url }) => (
            <DocPreview
              name={name}
              type={type!}
              key={`${id}-${name}-doc`}
              url={url!}
            />
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
