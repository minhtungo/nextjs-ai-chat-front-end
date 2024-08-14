import { createNewMessageStore, getMessageFiles } from "@/lib/chat";
import { getMessagesQueryKey } from "@/lib/queryKey";
import { chatStore } from "@/store/chat";
import { useMessageStore } from "@/store/message";
import { useQueryClient } from "@tanstack/react-query";
import { Subscription } from "centrifuge";
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
  } = useMessageStore();

  const { setMessages, messages } = chatStore();
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
      return;
    }

    const { images, docs, imagesWithPreview } = getMessageFiles(files);

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

    const newMessage = createNewMessageStore({
      content,
      userId,
      docs,
      images: imagesWithPreview,
    });

    console.log("current message", messages);
    console.log("new message", newMessage);

    setMessages((prev) => [...prev, newMessage]);
    queryClient.invalidateQueries({
      queryKey: getMessagesQueryKey(chatId),
    });
    clearMessageStore();
  };

  return {
    sendMessage,
  };
};
