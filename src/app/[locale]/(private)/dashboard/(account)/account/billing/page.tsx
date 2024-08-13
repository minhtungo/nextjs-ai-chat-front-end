import Plans from "@/components/private/account/Plans";
import PageTitle from "@/components/private/common/PageTitle";
import BillingHistory from "@/components/private/dashboard/BillingHistory";
import PaymentMethodDialog from "@/components/private/dashboard/PaymentMethodDialog";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";

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
      <PageTitle title="Billing" />
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
