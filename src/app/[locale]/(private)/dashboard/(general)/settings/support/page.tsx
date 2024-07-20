import FeedbackForm from "@/components/private/dashboard/FeedbackForm";
import { FC } from "react";

interface FeedbackPageProps {}

const FeedbackPage: FC<FeedbackPageProps> = async () => {
  return <FeedbackForm />;
};

export default FeedbackPage;
