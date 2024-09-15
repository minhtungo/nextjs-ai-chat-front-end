import PageTitle from "@/components/private/common/PageTitle";
import FeedbackForm from "@/components/private/feedback/FeedbackForm";
import Page from "@/components/public/common/Page";
import PageHeader from "@/components/public/common/PageHeader";
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
