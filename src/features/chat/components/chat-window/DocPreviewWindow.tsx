import { Button } from "@/components/ui/button";
import { useChat } from "@/features/chat/store/use-chat";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

import ChatWindowWrapper from "@/features/chat/components/chat-window/ChatWindowWrapper";
import SlidesNav from "@/components/common/SlidesNav";
import PdfPreview from "@/features/chat/components/PdfPreview";
import TooltipContainer from "@/components/common/TooltipContainer";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const DocPreviewWindow = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number | null>(null);

  const { setSelectedDocIndex, selectedDocIndex, docs } = useChat();

  return (
    <ChatWindowWrapper>
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
