import { MESSAGE_TOKEN_LIMIT } from "@/app-config";
import { currentSubscriptionAtom } from "@/atoms/subscription";
import { useMessage } from "@/hooks/use-message";
import { useMessages } from "@/hooks/use-messages";
import { createNewMessageStore } from "@/lib/chat";
import { isWithinTokenLimit } from "gpt-tokenizer/model/gpt-4o";
import { useAtomValue } from "jotai";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

interface useSendMessageProps {
  userId: string;
}

export const useSendMessage = ({ userId }: useSendMessageProps) => {
  const {
    message: { mathEquation, content },
    pending,
    images,
    docs,
    resetMessageState,
    setInTokenLimit,
  } = useMessage();

  const { setMessages, messages } = useMessages();

  const currentSubscription = useAtomValue(currentSubscriptionAtom);

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
      userId: userId ?? getCookie("guestId") ?? "",
      docs,
      images,
    });

    // setOptimisticMessage({
    //   chatId,
    //   newMessage,
    // });

    setMessages((currentMessages) => [...currentMessages, newMessage]);

    console.log("sendMessage", messages);

    if (currentSubscription) {
      currentSubscription.publish({
        input: {
          content: submitContent,
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

    // queryClient.invalidateQueries({
    //   queryKey: getMessagesQueryKey(chatId),
    // });

    resetMessageState();
  };

  return {
    sendMessage,
  };
};
