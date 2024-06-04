import { FC } from "react";
import PromptForm from "./PromptForm";

interface ChatPanelProps {
  input: string;
  setInput: (value: string) => void;
}

const ChatPanel: FC<ChatPanelProps> = ({ input, setInput }) => {
  return (
    <div className="mx-auto mb-4 w-full max-w-5xl px-4 lg:px-6">
      <PromptForm input={input} setInput={setInput} />
    </div>
  );
};

export default ChatPanel;
