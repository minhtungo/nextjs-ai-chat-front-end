import OnboardingForm from "@/components/private/onboarding/OnboardingForm";
import { getCurrentUser } from "@/lib/auth";

const OnboardingPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // if (user.isOnboarded) {
  //   redirect(PROTECTED_BASE_URL);
  // }

  return (
    <div className="flex min-h-[100dvh] w-screen flex-col items-center justify-center">
      <div className="max-w-xl">
        <OnboardingForm user={user} />
      </div>
    </div>
  );
};

export default OnboardingPage;
