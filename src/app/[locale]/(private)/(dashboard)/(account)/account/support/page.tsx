import PageTitle from "@/components/common/PageTitle";
import FeedbackForm from "@/features/feedback/components/FeedbackForm";
import Page from "@/components/layout/Page";
import PageHeader from "@/components/layout/PageHeader";
import { FC } from "react";

interface FeedbackPageProps {}

const FeedbackPage: FC<FeedbackPageProps> = async () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle title="Feedback" description="Send us your feedback" />
      </PageHeader>
      <FeedbackForm />
    </Page>
  );
};

export default FeedbackPage;
