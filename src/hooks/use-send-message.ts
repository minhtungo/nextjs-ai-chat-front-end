import { useMessages } from "@/hooks/use-messages";
import { createNewMessageStore, getMessageFiles } from "@/lib/chat";
import { CHAT_TOKEN_LIMIT, MESSAGE_TOKEN_LIMIT } from "@/lib/constant";
import { getMessagesQueryKey } from "@/lib/queryKey";
import { useMessageStore } from "@/store/message";
import { useQueryClient } from "@tanstack/react-query";
import { Subscription } from "centrifuge";
import {
  encode,
  encodeChat,
  isWithinTokenLimit,
} from "gpt-tokenizer/model/gpt-4o";
import { toast } from "sonner";

interface useSendMessageProps {
  userId: string;
  chatId: string;
  sub: Subscription | null;
}

export const useSendMessage = ({
  userId,
  chatId,
  sub,
}: useSendMessageProps) => {
  const {
    messageStore: { files, mathEquation, message, isPending },
    clearMessageStore,
    isMessageWithinTokenLimit,
    setIsMessageWithinTokenLimit,
  } = useMessageStore();

  const { messages, setMessages } = useMessages();
  const queryClient = useQueryClient();

  const sendMessage = async ({ focusedImage }: { focusedImage?: any }) => {
    if (isPending) return;

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // @ts-ignore
      e.target["message"]?.blur();
    }

    const content = mathEquation || message;

    if (!content || content.trim() === "") {
      console.log("content is empty");
      return;
    }

    // console.log(encode(content));
    // console.log(encodeChat(messages));

    const withinMessageLimit = isWithinTokenLimit(content, MESSAGE_TOKEN_LIMIT);

    setIsMessageWithinTokenLimit(withinMessageLimit);

    if (!withinMessageLimit) {
      toast.error("You have exceeded the token limit");
      return;
    }

    const { images, docs, imagesWithPreview } = getMessageFiles(files);

    const newMessage = createNewMessageStore({
      content,
      userId,
      docs,
      images: imagesWithPreview,
    });

    setMessages((prev) => [...prev, newMessage]);

    if (sub) {
      sub.publish({
        input: {
          content,
          images,
          docs,
          ...(focusedImage ? { focusedImage } : {}),
        },
      });
    } else {
      toast.error("Error connecting to the server. Please try again later.");
      return;
    }

    queryClient.invalidateQueries({
      queryKey: getMessagesQueryKey(chatId),
    });

    clearMessageStore();
  };

  return {
    sendMessage,
    isMessageWithinTokenLimit,
  };
};
