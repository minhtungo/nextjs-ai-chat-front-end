import Typography from "@/components/ui/typography";
import { FC } from "react";
import OnboardingForm from "./OnboardingForm";
import { getCurrentUser } from "@/lib/auth";

interface PageNamePageProps {}

const PageNamePage: FC<PageNamePageProps> = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-4 flex max-w-3xl flex-col gap-y-4">
        <Typography variant="h2" tag="h1" className="mb-4">
          Personalize your learning experience
        </Typography>
        <OnboardingForm user={user} />
      </div>
    </div>
  );
};

export default PageNamePage;
