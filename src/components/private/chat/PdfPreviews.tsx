"use client";

import Spinner from "@/components/common/Spinner";
import { FC, useEffect, useState } from "react";
import {
  AreaHighlight,
  Highlight,
  PdfHighlighter,
  PdfLoader,
  Popup,
  Tip,
} from "react-pdf-highlighter";

interface PdfPreviewsProps {
  url: string;
}

const getNextId = () => String(Math.random()).slice(2);

const HighlightPopup = ({
  comment,
}: {
  comment: { text: string; emoji: string };
}) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const PdfPreviews: FC<PdfPreviewsProps> = ({ url = "/test.pdf" }) => {
  const [highlights, setHighlights] = useState<any[]>([]);

  const resetHighlights = () => {
    setHighlights([]);
  };

  const addHighlight = (highlight: any) => {
    setHighlights((prev) => [{ ...highlight, id: getNextId() }, ...highlights]);
  };

  return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          height: "100vh",
          width: "75vw",
          position: "relative",
        }}
      >
        <PdfLoader
          url={"https://arxiv.org/pdf/1708.08021"}
          beforeLoad={<Spinner />}
        >
          {(pdfDocument) => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              onScrollChange={() => {}}
              scrollRef={(scrollTo) => {}}
              onSelectionFinished={(
                position,
                content,
                hideTipAndSelection,
                transformSelection,
              ) => (
                <Tip
                  onOpen={transformSelection}
                  onConfirm={(comment) => {
                    addHighlight({ content, position, comment });

                    hideTipAndSelection();
                  }}
                />
              )}
              highlightTransform={(
                highlight,
                index,
                setTip,
                hideTip,
                viewportToScaled,
                screenshot,
                isScrolledTo,
              ) => {
                const isTextHighlight = !highlight.content?.image;

                const component = isTextHighlight ? (
                  <Highlight
                    isScrolledTo={isScrolledTo}
                    position={highlight.position}
                    comment={highlight.comment}
                  />
                ) : (
                  <AreaHighlight
                    isScrolledTo={isScrolledTo}
                    highlight={highlight}
                    onChange={(boundingRect) => {
                      //   updateHighlight(
                      //     highlight.id,
                      //     { boundingRect: viewportToScaled(boundingRect) },
                      //     { image: screenshot(boundingRect) },
                      //   );
                    }}
                  />
                );

                return (
                  <Popup
                    popupContent={<HighlightPopup {...highlight} />}
                    onMouseOver={(popupContent) =>
                      setTip(highlight, (highlight) => popupContent)
                    }
                    onMouseOut={hideTip}
                    key={index}
                  >
                    {component}
                  </Popup>
                );
              }}
              highlights={highlights}
            />
          )}
        </PdfLoader>
      </div>
    </div>
  );
};

export default PdfPreviews;
