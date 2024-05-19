import SignInForm from "@/components/SignInForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function SignIn() {
  return (
    <main className="flex h-[calc(100vh-56px)] w-full items-center justify-center">
      <MaxWidthWrapper>
        <SignInForm />
      </MaxWidthWrapper>
    </main>
  );
}
