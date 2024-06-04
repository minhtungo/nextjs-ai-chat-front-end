import "server-only";

import { Chat } from "@/types/chat";
import UserMessage from "@/components/dashboard/UserMessage";
import BotMessage from "@/components/dashboard/BotMessage";

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === "user" ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        ),
    }));
};
