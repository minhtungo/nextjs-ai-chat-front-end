import { getCurrentUser } from "@/lib/auth";
import { FC } from "react";
import OnboardingForm from "./OnboardingForm";
import { redirect } from "next/navigation";
import { PROTECTED_BASE_URL } from "@/routes";

interface PageNamePageProps {}

const OnboardingPage: FC<PageNamePageProps> = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (user.isOnboarded) {
    redirect(PROTECTED_BASE_URL);
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="max-w-xl">
        <OnboardingForm user={user} />
      </div>
    </div>
  );
};

export default OnboardingPage;
