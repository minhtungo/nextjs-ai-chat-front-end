import Plans from "@/components/subscription/Plans";

import BillingHistory from "@/components/subscription/BillingHistory";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";
import PaymentMethodDialog from "@/components/subscription/PaymentMethodDialog";

export const metadata: Metadata = {
  title: "Billing",
};

const BillingPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return (
    <>
      <Typography variant="h5" tag="h3" className="mb-4">
        Plans
      </Typography>
      <Plans currentPlan={user.plan} />
      <Separator className="my-8" />
      <Typography variant="h5" tag="h3" className="mb-4">
        Payment Method
      </Typography>
      <PaymentMethodDialog />
      <Separator className="my-8" />
      <Typography variant="h5" tag="h3" className="mb-4">
        Billing History
      </Typography>
      <BillingHistory />
    </>
  );
};

export default BillingPage;
