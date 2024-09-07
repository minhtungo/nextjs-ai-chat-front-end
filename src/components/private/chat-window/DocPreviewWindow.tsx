import ChatWindowWrapper from "@/components/private/chat-window/ChatWindowWrapper";
import PdfPreview from "@/components/private/chat/PdfPreview";
import { useSendMessage } from "@/hooks/use-send-message";
import { FC } from "react";

interface DocPreviewWindowProps {
  userId: string;
  chatId?: string;
  url: string;
}

const DocPreviewWindow: FC<DocPreviewWindowProps> = ({
  userId,
  chatId,
  url,
}) => {
  console.log("DocPreviewWindow", url);
  const { sendMessage } = useSendMessage(userId, chatId);

  const onSubmitMessage = async () => {
    sendMessage();
  };

  return (
    <ChatWindowWrapper
      onSubmitMessage={onSubmitMessage}
      userId={userId}
      chatId={chatId}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <PdfPreview />
      </div>
    </ChatWindowWrapper>
  );
};

export default DocPreviewWindow;
