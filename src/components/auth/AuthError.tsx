import { FC } from "react";
import CardWrapper from "../CardWrapper";
import { signInHref } from "@/routes";

interface AuthErrorProps {
  className?: string;
}

const AuthError: FC<AuthErrorProps> = ({ className }) => {
  return (
    <CardWrapper
      headerLabel="Something went wrong!"
      backButtonLabel="Quay lại đăng nhập"
      backButtonHref={signInHref}
    />
  );
};

export default AuthError;
