import { createChatAction } from "@/actions/chat";
import { MESSAGE_TOKEN_LIMIT } from "@/app-config";
import { currentSubscriptionAtom } from "@/atoms/subscription";
import { useMessage } from "@/hooks/use-message";
import { useMessages } from "@/hooks/use-messages";
import { createNewMessageStore } from "@/lib/chat";
import { isGuestUser } from "@/lib/utils";
import { isWithinTokenLimit } from "gpt-tokenizer/model/gpt-4o";
import { useAtom } from "jotai";
import { toast } from "sonner";

export const useSendMessage = (userId: string) => {
  const {
    message: { mathEquation, content },
    pending,
    images,
    docs,
    resetMessageState,
    setInTokenLimit,
  } = useMessage();

  const { messages, setMessages } = useMessages();

  const [currentSubscription, setupSubscription] = useAtom(
    currentSubscriptionAtom,
  );

  const sendMessage = async (focusedImage?: any) => {
    if (pending) return;
    let newSub;
    if (isGuestUser(userId) && messages.length === 0) {
      const [newRoom, error] = await createChatAction();

      if (error) {
        toast.error(error.message);
        return;
      }

      newSub = await setupSubscription(`rooms:${newRoom?.id}`);
    }

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

    setMessages((currentMessages) => [...currentMessages, newMessage]);

    const sub = currentSubscription || newSub;

    if (sub) {
      sub.publish({
        input: {
          content: submitContent,
          images: images.map((image) => ({
            ...image,
          })),
          docs,
          ...(focusedImage ? { focusedImage } : {}),
        },
      });
    } else {
      console.log("-----------------error");
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
