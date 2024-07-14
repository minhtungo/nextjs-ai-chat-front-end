import BillingHistory from "@/components/dashboard/BillingHistory";
import PaymentMethodDialog from "@/components/dashboard/PaymentMethodDialog";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
};

const BillingPage = async () => {
  return (
    <>
      <Typography variant="h5" tag="h3" className="mb-4">
        Payment Method
      </Typography>
      <PaymentMethodDialog />
      <Separator className="my-6" />
      <Typography variant="h5" tag="h3" className="mb-4">
        Billing History
      </Typography>
      <BillingHistory />
    </>
  );
};

export default BillingPage;
