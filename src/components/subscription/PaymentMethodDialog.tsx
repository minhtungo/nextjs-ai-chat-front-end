import PaymentMethods from "@/components/subscription/PaymentMethods";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PaymentMethodDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Add payment method</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Method</DialogTitle>
          <DialogDescription>
            Add a new payment method to your account.
          </DialogDescription>
        </DialogHeader>
        <PaymentMethods />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
