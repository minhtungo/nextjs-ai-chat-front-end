import { createChatAction } from "@/features/chat/actions";
import { MESSAGE_TOKEN_LIMIT } from "@/config/config";
import { useChat } from "@/features/chat/store/use-chat";
import { useMessage } from "@/features/chat/store/use-message";
import { useMessages } from "@/features/chat/store/use-messages";
import { useSubscription } from "@/features/chat/store/use-subscription";
import { createNewMessageStore } from "@/lib/chat";
import { isGuestUser } from "@/lib/utils";
import { Subscription } from "centrifuge";
import { isWithinTokenLimit } from "gpt-tokenizer/model/gpt-4o";
import { toast } from "sonner";

export const useSendMessage = () => {
  const {
    message: { mathEquation, content },
    pending,
    images,
    docs,
    resetMessageState,
    setInTokenLimit,
  } = useMessage();

  const { chatId: currentChatId, chatUserId: userId } = useChat();

  const { focusedImage } = useChat();

  const { messages, setMessages } = useMessages();

  const { subscription, setupSubscription } = useSubscription();

  const sendMessage = async () => {
    if (pending) return;

    let newSub: Subscription | undefined;

    const submitContent = mathEquation || content;

    if (!submitContent || submitContent.trim() === "") {
      return;
    }

    const withinMessageLimit = isWithinTokenLimit(
      content!,
      MESSAGE_TOKEN_LIMIT,
    );

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

    const input = {
      content: submitContent,
      images: images.map((image) => ({
        ...image,
      })),
      docs,
      ...(focusedImage ? { focusedImage } : {}),
    };

    setMessages((currentMessages) => [...currentMessages, newMessage]);

    console.log("use send message", messages);

    resetMessageState();

    if (!currentChatId && messages.length === 0) {
      const [newRoom, error] = await createChatAction(
        submitContent.substring(0, 50),
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      newSub = await setupSubscription(`rooms:${newRoom?.id}`);

      newSub?.on("subscribed", () => {
        newSub?.publish({
          input,
        });
      });

      if (!isGuestUser(userId)) {
        window.history.replaceState({}, "", `/chat/${newRoom?.id}`);
      }
    }

    if (subscription) {
      subscription
        .publish({
          input,
        })
        .then(
          function (ctx) {
            console.log(ctx);
          },
          function (err) {
            console.log("err", err);
          },
        );
    }
  };

  return {
    sendMessage,
  };
};
