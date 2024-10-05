import { createChatAction } from "@/actions/chat";
import { MESSAGE_TOKEN_LIMIT } from "@/config/config";
import { currentSubscriptionAtom } from "@/atoms/subscription";
import { useMessage } from "@/hooks/use-message";
import { useMessages } from "@/hooks/use-messages";
import { createNewMessageStore } from "@/lib/chat";
import { isGuestUser } from "@/lib/utils";
import { Subscription } from "centrifuge";
import { isWithinTokenLimit } from "gpt-tokenizer/model/gpt-4o";
import { useAtom } from "jotai";
import { toast } from "sonner";

export const useSendMessage = (
  userId: string,
  currentChatId: string | undefined,
) => {
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

    if (currentSubscription) {
      currentSubscription
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
