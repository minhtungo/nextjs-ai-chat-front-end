import PromptForm from "@/components/chat/PromptForm";
import { useSendMessage } from "@/hooks/use-send-message";

interface PromptFormContainerProps {
  userId: string;
  chatId?: string;
}

const PromptFormContainer = ({ userId, chatId }: PromptFormContainerProps) => {
  const { sendMessage } = useSendMessage(userId, chatId);

  return <PromptForm onSubmit={sendMessage} />;
};

export default PromptFormContainer;
