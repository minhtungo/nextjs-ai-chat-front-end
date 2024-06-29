import CardWrapper from "@/components/CardWrapper";
import Feedback from "@/components/dashboard/Feedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
};

const ProfilePage = async () => {
  return (
    <CardWrapper
      headerLabel="Report an issue"
      description="What area are you having problems with?"
    >
      <Feedback />
    </CardWrapper>
  );
};

export default ProfilePage;
