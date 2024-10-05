import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PromptFormContainer from "@/components/chat/PromptFormContainer";
import PromptInfo from "@/components/chat/PromptInfo";

interface ChatPanelProps {
  userId: string;
  chatId?: string;
}

const ChatPanel = ({ chatId, userId }: ChatPanelProps) => {
  return (
    <MaxWidthWrapper className="max-w-5xl space-y-3 py-3">
      <PromptInfo userId={userId} />
      <PromptFormContainer userId={userId} chatId={chatId} />
    </MaxWidthWrapper>
  );
};

export default ChatPanel;
