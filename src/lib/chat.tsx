import { Chat } from "@/types/chat";

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display: message.role === "user" ? <></> : "",
    }));
};
