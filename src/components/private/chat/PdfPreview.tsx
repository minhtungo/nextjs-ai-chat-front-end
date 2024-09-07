"use client";

import { FC, useCallback } from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PdfPreviewProps {
  url?: string;
}

const highlightPattern = (text: string, pattern: string) => {
  return text.replace(pattern, (value) => `<mark>${value}</mark>`);
};

const PdfPreview: FC<PdfPreviewProps> = ({ url = "/test.pdf" }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [searchText, setSearchText] = useState("");
  const [selectedText, setSelectedText] = useState("");

  const handleMouseUp = () => {
    const selectedText = window?.getSelection()?.toString().trim();

    if (selectedText) {
      setSelectedText(selectedText);
    } else {
      setSelectedText("");
    }
  };

  const textRenderer = useCallback(
    (textItem: any) => highlightPattern(textItem.str, searchText),
    [searchText],
  );

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className="h-full w-full space-y-4">
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        onMouseUp={handleMouseUp}
        className="mx-auto w-fit"
      >
        <Page
          pageNumber={pageNumber}
          customTextRenderer={textRenderer}
          inputRef={(ref) => console.log(ref)}
        />
      </Document>
      {selectedText}
      {/* <div>
        <label htmlFor="search">Search:</label>
        <input
          type="search"
          id="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div> */}
      <div className="mx-auto flex items-center justify-center gap-x-2 text-sm">
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
    </div>
  );
};

export default PdfPreview;
