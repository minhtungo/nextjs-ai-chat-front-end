import BillingHistory from "@/components/dashboard/BillingHistory";
import PaymentMethods from "@/components/dashboard/PaymentMethods";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
};

const BillingPage = () => {
  return (
    <>
      <BillingHistory />
      <PaymentMethods />
    </>
  );
};

export default BillingPage;
