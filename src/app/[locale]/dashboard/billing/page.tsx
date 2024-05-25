import PaymentMethods from "@/components/dashboard/PaymentMethods";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
};

const BillingPage = () => {
  return <PaymentMethods />;
};

export default BillingPage;
