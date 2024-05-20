import { FC } from "react";
import FormWrapper from "./FormWrapper";

interface AuthErrorProps {
  className?: string;
}

const AuthError: FC<AuthErrorProps> = ({ className }) => {
  return (
    <FormWrapper
      headerLabel="Something went wrong!"
      backButtonLabel="Quay lại đăng nhập"
      backButtonHref="/sign-in"
    />
  );
};

export default AuthError;
