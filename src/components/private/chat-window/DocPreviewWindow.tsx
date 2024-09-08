import ChatWindowWrapper from "@/components/private/chat-window/ChatWindowWrapper";
import PdfPreview from "@/components/private/chat/PdfPreview";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { useSendMessage } from "@/hooks/use-send-message";
import { X } from "lucide-react";
import { FC } from "react";
import { pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

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
  const { setSelectedDocPreview } = useChat();

  const onSubmitMessage = async () => {
    sendMessage();
  };

  return (
    <ChatWindowWrapper
      onSubmitMessage={onSubmitMessage}
      userId={userId}
      chatId={chatId}
    >
      <div className="flex h-full w-full flex-col justify-between gap-3">
        <div className="flex h-14 w-full items-center gap-3 px-4">
          <div className="ml-auto flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-background/60"
              onClick={() => {
                setSelectedDocPreview(null);
              }}
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>

        <PdfPreview className="flex-1" />
      </div>
    </ChatWindowWrapper>
  );
};

export default DocPreviewWindow;
