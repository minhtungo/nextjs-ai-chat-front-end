import { sendVerificationEmailAction } from "@/actions/auth";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import SubmitButton from "@/components/common/SubmitButton";
import { cn } from "@/lib/utils";
import { useServerAction } from "zsa-react";

interface ResendVerificationEmailProps extends React.ComponentProps<"button"> {
  token: string;
}

const ResendVerificationEmail = ({
  className,
  token,
}: ResendVerificationEmailProps) => {
  const { error, execute, isPending, isSuccess } = useServerAction(
    sendVerificationEmailAction,
  );

  const onResendVerificationEmail = async () => {
    await execute(token);
  };

  return (
    <>
      {error && <FormError className="mt-4" message={error.message} />}
      {isSuccess && <FormSuccess message="success.emailVerified" />}
      <SubmitButton
        type="button"
        className={cn("w-full", className)}
        onClick={onResendVerificationEmail}
        isPending={isPending}
      >
        Resend Verification Email
      </SubmitButton>
    </>
  );
};

export default ResendVerificationEmail;
