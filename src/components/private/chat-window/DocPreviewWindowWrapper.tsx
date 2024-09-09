import OverlayWindow from "@/components/common/OverlayWindow";
import Spinner from "@/components/common/Spinner";
import { useChat } from "@/hooks/use-chat";
import dynamic from "next/dynamic";
import { FC } from "react";

interface DocPreviewWindowWrapperProps {
  userId: string;
  chatId?: string;
}

const DocPreviewWindow = dynamic(
  () => import("@/components/private/chat-window/DocPreviewWindow"),
  {
    loading: () => (
      <OverlayWindow className="flex h-full w-full items-center justify-center">
        <Spinner className="size-5" />
      </OverlayWindow>
    ),
  },
);

const DocPreviewWindowWrapper: FC<DocPreviewWindowWrapperProps> = ({
  userId,
  chatId,
}) => {
  const { selectedDocIndex } = useChat();

  return (
    <>
      {selectedDocIndex !== null && (
        <DocPreviewWindow userId={userId} chatId={chatId} />
      )}
    </>
  );
};

export default DocPreviewWindowWrapper;
