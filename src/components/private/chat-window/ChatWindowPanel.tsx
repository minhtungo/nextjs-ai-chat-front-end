"use client";

import { FC } from "react";

import PromptForm from "@/components/private/chat/PromptForm";
import { Badge } from "@/components/ui/badge";

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
