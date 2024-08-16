import { useMessage } from "@/hooks/use-message";
import { useMessages } from "@/hooks/use-messages";
import { createNewMessageStore } from "@/lib/chat";
import { MESSAGE_TOKEN_LIMIT } from "@/lib/constant";
import { getMessagesQueryKey } from "@/lib/queryKey";
import { useQueryClient } from "@tanstack/react-query";
import { Subscription } from "centrifuge";
import { isWithinTokenLimit } from "gpt-tokenizer/model/gpt-4o";
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
    message: { mathEquation, content },
    pending,
    images,
    docs,
    resetMessageState,
    setInTokenLimit,
  } = useMessage();

  const { setMessages } = useMessages();
  const queryClient = useQueryClient();

  const sendMessage = async ({ focusedImage }: { focusedImage?: any }) => {
    if (pending) return;

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // @ts-ignore
      e.target["message"]?.blur();
    }

    const submitContent = mathEquation || content;

    if (!submitContent || submitContent.trim() === "") {
      return;
    }

    // console.log(encode(content));
    // console.log(encodeChat(messages));

    const withinMessageLimit = isWithinTokenLimit(content, MESSAGE_TOKEN_LIMIT);

    setInTokenLimit(withinMessageLimit);

    if (!withinMessageLimit) {
      toast.error("You have exceeded the token limit");
      return;
    }

    const newMessage = createNewMessageStore({
      content: submitContent,
      userId,
      docs,
      images,
    });

    setMessages((prev) => [...prev, newMessage]);

    if (sub) {
      sub.publish({
        input: {
          submitContent,
          images: images.map(
            ({ name, type, originalWidth, originalHeight, url }) => ({
              url,
              type,
              name,
              originalWidth,
              originalHeight,
            }),
          ),
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

    resetMessageState();
  };

  return {
    sendMessage,
  };
};
