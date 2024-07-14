"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import NewChatCreation from "./NewChatCreation";

const CreateChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10"
        >
          <Plus className="size-4 -translate-x-2 stroke-2" />
          New Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select a subject</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <NewChatCreation toggleDialog={setIsOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatButton;
