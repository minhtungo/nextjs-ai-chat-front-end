"use client";

import SubmitButton from "@/components/common/SubmitButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRemoveChats } from "@/data/mutations/use-remove-chats";
import { useState } from "react";

const DeleteAllChatButton = () => {
  const [open, setOpen] = useState(false);
  const { mutate: removeChats, isPending } = useRemoveChats(setOpen);

  const handleDeletion = async (e: any) => {
    e.preventDefault();
    removeChats({
      deleteAll: true,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete All</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Clear your chat history - are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all your
            chats from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <SubmitButton
              variant="destructive"
              onClick={handleDeletion}
              type="button"
              isPending={isPending}
            >
              Confirm Deletion
            </SubmitButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAllChatButton;
