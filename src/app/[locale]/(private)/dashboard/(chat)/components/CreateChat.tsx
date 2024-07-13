"use client";

import { createNewChatAction } from "@/actions/chat";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { chatStore } from "@/store/chat";
import { Plus } from "lucide-react";
import { FC } from "react";
import { useServerAction } from "zsa-react";
import SubjectSelection from "./SubjectSelection";
import { toast } from "sonner";

interface CreateChatProps {}

const CreateChat: FC<CreateChatProps> = () => {
  const {
    getChat: { subject },
  } = chatStore();
  const { isPending, execute } = useServerAction(createNewChatAction);

  const createNewChat = async () => {
    const [_, error] = await execute({
      subject: subject || "",
    });

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10"
        >
          <Plus className="size-4 -translate-x-2 stroke-2" />
          New Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a subject</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <SubjectSelection />
        </div>
        <DialogFooter>
          <SubmitButton
            type="button"
            className="w-full"
            onClick={createNewChat}
            label="Continue"
            isPending={isPending}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChat;
