import OnboardingForm from "@/components/onboarding/OnboardingForm";
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
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      {/* <OnboardingForm user={user} /> */}
      <OnboardingForm />
    </div>
  );
};

export default OnboardingPage;
