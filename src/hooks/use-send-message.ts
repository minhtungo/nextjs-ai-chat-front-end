import { createNewMessageStore, getMessageFiles } from "@/lib/chat";
import { chatStore } from "@/store/chat";
import { useMessageStore } from "@/store/message";
import { Subscription } from "centrifuge";
import { toast } from "sonner";

interface useSendMessageProps {
  userId: string;
  sub: Subscription | null;
}

export const useSendMessage = ({ userId, sub }: useSendMessageProps) => {
  const {
    messageStore: { files, mathEquation, message, isPending },
    clearMessageStore,
  } = useMessageStore();

  const { setMessages } = chatStore();

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

    setMessages((prev) => [...prev, newMessage]);
    clearMessageStore();
  };

  return {
    sendMessage,
  };
};
