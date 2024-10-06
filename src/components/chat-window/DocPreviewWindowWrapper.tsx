"use client";

import OverlayWindow from "@/components/common/OverlayWindow";
import Spinner from "@/components/common/Spinner";
import { useChat } from "@/hooks/use-chat";
import dynamic from "next/dynamic";

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
