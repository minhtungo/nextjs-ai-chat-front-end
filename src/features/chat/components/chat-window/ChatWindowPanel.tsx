"use client";

import PromptForm from "@/features/chat/components/PromptForm";
import { Badge } from "@/components/ui/badge";
import { useSendMessage } from "@/features/chat/store/use-send-message";
import { cn } from "@/lib/utils";

interface ChatWindowPanelProps extends React.ComponentProps<"div"> {
  isFocusMode?: boolean;
}

const ChatWindowPanel = ({ isFocusMode, className }: ChatWindowPanelProps) => {
  const { sendMessage } = useSendMessage();
  return (
    <div className={cn(className)}>
      {isFocusMode && (
        <Badge variant="secondary" className="mb-2">
          Focus on selection
        </Badge>
      )}
      <PromptForm onSubmitMessage={(content) => sendMessage(content)} />
    </div>
  );
};

export default ChatWindowPanel;
