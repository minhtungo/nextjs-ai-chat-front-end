"use client";

import { cn } from "@/lib/utils";
import { SetStateAction } from "jotai";
import { Dispatch, FC, useCallback, useState } from "react";
import { Document, Page } from "react-pdf";

interface PdfPreviewProps {
  className?: string;
  url: string;
  name: string;
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setNumPages: Dispatch<SetStateAction<number | null>>;
}

const highlightPattern = (text: string, pattern: string) => {
  return text.replace(pattern, (value) => `<mark>${value}</mark>`);
};

const PdfPreview: FC<PdfPreviewProps> = ({
  className,
  url = "/test.pdf",
  pageNumber,
  setPageNumber,
  setNumPages,
}) => {
  const testUrl = "/test.pdf";

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
    <div className={cn("space-y-4", className)}>
      <Document
        file={testUrl}
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
      {/* <div>
        <label htmlFor="search">Search:</label>
        <input
          type="search"
          id="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div> */}
    </div>
  );
};

export default PdfPreview;
