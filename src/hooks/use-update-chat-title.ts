import { updateChatAction } from "@/actions/chat";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

export const useUpdateChatTitle = (chatId: string, currentTitle: string) => {
  const router = useRouter();

  const [title, setTitle] = useState(currentTitle);
  const [isEditing, setIsEditing] = useState(false);

  const { execute: updateChat } = useServerAction(updateChatAction, {
    onError: ({ err }) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const updateChatTitle = async () => {
    if (title === currentTitle) {
      setIsEditing(false);
      return;
    }

    updateChat({
      chatId,
      title,
    });

    setIsEditing(false);
  };

  return {
    title,
    isEditing,
    setTitle,
    setIsEditing,
    updateChatTitle,
  };
};
