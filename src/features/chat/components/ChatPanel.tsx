import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PromptFormContainer from "@/features/chat/components/PromptFormContainer";
import PromptInfo from "@/features/chat/components/PromptInfo";

const ChatPanel = () => {
  return (
    <MaxWidthWrapper className="max-w-5xl space-y-3 py-3">
      <PromptInfo />
      <PromptFormContainer />
    </MaxWidthWrapper>
  );
};

export default ChatPanel;
