import PageTitle from "@/components/private/common/PageTitle";
import FeedbackForm from "@/components/private/feedback/FeedbackForm";
import { FC } from "react";

interface FeedbackPageProps {}

const FeedbackPage: FC<FeedbackPageProps> = async () => {
  return (
    <>
      <PageTitle title="Feedback" description="Send us your feedback" />
      <FeedbackForm />
    </>
  );
};

export default FeedbackPage;
