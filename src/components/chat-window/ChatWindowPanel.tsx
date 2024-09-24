"use client";

import { FC } from "react";

import { Badge } from "@/components/ui/badge";
import PromptForm from "@/components/chat/PromptForm";

interface ChatWindowPanelProps {
  isFocusMode?: boolean;
  onSubmitMessage: () => void;
}

const ChatWindowPanel: FC<ChatWindowPanelProps> = ({
  isFocusMode,
  onSubmitMessage,
}) => {
  return (
    <>
      {isFocusMode && (
        <Badge variant="secondary" className="mb-2">
          Focus on selection
        </Badge>
      )}
      <PromptForm onSubmit={onSubmitMessage} />
    </>
  );
};

export default ChatWindowPanel;
