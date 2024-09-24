import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { useSendMessage } from "@/hooks/use-send-message";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { FC, useState } from "react";
import { pdfjs } from "react-pdf";

import ChatWindowWrapper from "@/components/chat-window/ChatWindowWrapper";
import SlidesNav from "@/components/chat-window/SlidesNav";
import PdfPreview from "@/components/chat/PdfPreview";
import TooltipContainer from "@/components/common/TooltipContainer";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface DocPreviewWindowProps {
  userId: string;
  chatId?: string;
}

const DocPreviewWindow: FC<DocPreviewWindowProps> = ({ userId, chatId }) => {
  const { sendMessage } = useSendMessage(userId, chatId);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number | null>(null);

  const { setSelectedDocIndex, selectedDocIndex, docs } = useChat();

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
        <div className="flex h-14 w-full items-center justify-between gap-3 px-4 text-sm">
          <div className="flex items-center gap-x-2">
            <TooltipContainer content="Zoom in">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-background/60"
              >
                <ZoomIn className="size-5" />
              </Button>
            </TooltipContainer>
            <TooltipContainer content="Zoom out">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-background/60"
              >
                <ZoomOut className="size-5" />
              </Button>
            </TooltipContainer>

            <button
              disabled={pageNumber <= 1}
              className="disabled:text-muted-foreground"
              onClick={() => setPageNumber((cur) => cur - 1)}
            >
              <ChevronLeft className="size-4 text-muted-foreground hover:text-foreground" />
            </button>
            <span>
              {pageNumber} / {numPages}
            </span>
            <button
              disabled={pageNumber >= numPages!}
              onClick={() => setPageNumber((cur) => cur + 1)}
            >
              <ChevronRight className="size-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <TooltipContainer content="Close">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-background/60"
                onClick={() => {
                  setSelectedDocIndex(null);
                }}
              >
                <X className="size-5" />
              </Button>
            </TooltipContainer>
          </div>
        </div>
        <PdfPreview
          url={docs[selectedDocIndex!].url}
          name={docs[selectedDocIndex!].name}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          setNumPages={setNumPages}
        />
        <SlidesNav
          onNavigate={setSelectedDocIndex}
          selectedIndex={selectedDocIndex!}
          total={docs.length}
        />
      </div>
    </ChatWindowWrapper>
  );
};

export default DocPreviewWindow;
