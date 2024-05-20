import { FC } from "react";
import FormWrapper from "./FormWrapper";
import { signInHref } from "@/routes";

interface AuthErrorProps {
  className?: string;
}

const AuthError: FC<AuthErrorProps> = ({ className }) => {
  return (
    <FormWrapper
      headerLabel="Something went wrong!"
      backButtonLabel="Quay lại đăng nhập"
      backButtonHref={signInHref}
    />
  );
};

export default AuthError;
