import {
  ChangeEvent,
  FC,
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
} from "react";
import { Textarea } from "./ui/textarea";
import { ChatRequestOptions } from "ai";

interface ChatInputProps {
  value: string;
  onChange: (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) => void;
  chatFormRef: MutableRefObject<HTMLFormElement | null>;
}

const ChatInput: FC<ChatInputProps> = ({ value, onChange, chatFormRef }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return;
    }
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (chatFormRef.current) {
        chatFormRef.current.requestSubmit();
      }
    }
  };

  useEffect(() => {
    resizeTextArea();
    window.addEventListener("resize", resizeTextArea);
  }, []);

  return (
    <Textarea
      id="message"
      placeholder="Nhập câu hỏi của bạn..."
      className="max-h-48 min-h-0 resize-none border-0 px-0 shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      value={value}
      ref={textAreaRef}
      rows={1}
      onChange={(e) => {
        onChange(e);
        resizeTextArea();
      }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default ChatInput;
