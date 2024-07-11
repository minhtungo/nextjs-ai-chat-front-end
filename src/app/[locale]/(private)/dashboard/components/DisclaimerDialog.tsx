import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DisclaimerDialogProps {}

const DisclaimerDialog: FC<DisclaimerDialogProps> = () => {
  return (
    <Dialog>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Tutor Disclaimer</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground">
          Our AI Tutor can make mistakes. We appreciate your patience and
          encourage you to double check the results with one of our Human Tutors
          whenever there is doubt. Please help us improve your experience with
          your feedback.
        </div>
        <DialogFooter>
          <Button type="submit">Let's go</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisclaimerDialog;
