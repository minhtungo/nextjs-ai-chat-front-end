import "server-only";

import { saveChatAction } from "@/actions/chat";
import Spinner from "@/components/Spinner";
import BotMessage from "@/components/dashboard/BotMessage";
import UserMessage from "@/components/dashboard/UserMessage";
import { nanoid } from "@/lib/utils";
import { Chat, Message } from "@/types/chat";
import { openai } from "@ai-sdk/openai";
import {
  createAI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
  streamUI,
} from "ai/rsc";
import { getCurrentUser } from "../auth";
import { DataContent } from "ai";

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

export const submitUserMessage = async (
  content: string,
  encodedImage?: DataContent | URL,
) => {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    model: openai("gpt-4-turbo"),
    initial: <Spinner />,
    messages: [
      ...aiState.get().messages.map((message) => ({
        role: message.role,
        content: [
          {
            type: "text",
            text: message.content,
          },
          ...(encodedImage
            ? [{ type: "image" as any, image: encodedImage }]
            : []),
        ],
        name: message.id,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
  });
  return {
    id: nanoid(),
    display: result.value,
  };
};

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    "use server";

    const user = await getCurrentUser();

    if (user) {
      const aiState = getAIState();

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState);
        return uiState;
      }
    } else {
      return;
    }
  },
  onSetAIState: async ({ state }) => {
    "use server";

    const user = await getCurrentUser();

    if (user) {
      const { chatId, messages } = state;

      const createdAt = new Date();
      const userId = user.id as string;
      const path = `/chat/${chatId}`;

      const firstMessageContent = messages[0].content as string;
      const title = firstMessageContent.substring(0, 100);

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path,
      };

      await saveChatAction({ chat });
    } else {
      return;
    }
  },
});

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];
