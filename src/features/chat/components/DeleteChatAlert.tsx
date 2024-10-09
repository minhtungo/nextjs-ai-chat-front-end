import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Spinner from "@/components/common/Spinner";

interface DeleteChatAlertProps {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (value: boolean) => void;
  isRemovePending: boolean;
  onDeleteChat: (e: any) => Promise<void>;
}

const DeleteChatAlert: FC<DeleteChatAlertProps> = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  isRemovePending,
  onDeleteChat,
}) => {
  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your chat message and remove your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRemovePending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isRemovePending} onClick={onDeleteChat}>
            {isRemovePending && <Spinner />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteChatAlert;
