"use client";

import { chatIdAtom, chatInfoAtom, chatUserIdAtom } from "@/atoms/chat";
import { useChat } from "@/hooks/use-chat";
import { useChatInfo } from "@/hooks/use-chat-info";
import { useSetAtom } from "jotai";

interface ATestButtonProps {}

const ATestButton = ({}: ATestButtonProps) => {
  const setChatInfo = useSetAtom(chatInfoAtom);
  const setChatId = useSetAtom(chatIdAtom);
  const setChatUserId = useSetAtom(chatUserIdAtom);
  return (
    <div className="flex gap-x-3">
      <button
        onClick={() =>
          setChatInfo((prev) => {
            return {
              ...prev,
              chatId: Math.random().toString(),
            };
          })
        }
      >
        Change ChatId
      </button>
      <button onClick={() => setChatId(Math.random().toString())}>
        Change ChatId Focus
      </button>
      <button
        onClick={() =>
          setChatInfo((prev) => {
            return {
              ...prev,
              userId: Math.random().toString(),
            };
          })
        }
      >
        Change UserId
      </button>
      <button onClick={() => setChatUserId(Math.random().toString())}>
        Change UserId Focus
      </button>
    </div>
  );
};

export default ATestButton;
