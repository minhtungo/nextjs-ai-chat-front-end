"use client";

import OverlayWindow from "@/components/common/OverlayWindow";
import Spinner from "@/components/common/Spinner";
import { useChat } from "@/hooks/use-chat";
import dynamic from "next/dynamic";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const DocPreviewWindow = dynamic(
  () => import("@/components/chat-window/DocPreviewWindow"),
  {
    loading: () => (
      <OverlayWindow className="flex h-full w-full items-center justify-center">
        <Spinner className="size-5" />
      </OverlayWindow>
    ),
  },
);

const DocPreviewWindowWrapper = () => {
  const { selectedDocIndex } = useChat();

  return <>{selectedDocIndex !== null && <DocPreviewWindow />}</>;
};

export default DocPreviewWindowWrapper;
