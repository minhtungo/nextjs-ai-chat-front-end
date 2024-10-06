import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PromptFormContainer from "@/components/chat/PromptFormContainer";
import PromptInfo from "@/components/chat/PromptInfo";

const ChatPanel = () => {
  return (
    <MaxWidthWrapper className="max-w-5xl space-y-3 py-3">
      <PromptInfo />
      <PromptFormContainer />
    </MaxWidthWrapper>
  );
};

export default ChatPanel;
