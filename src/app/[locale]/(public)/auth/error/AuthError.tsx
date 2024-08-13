import { FC } from "react";
import CardWrapper from "@/components/common/CardWrapper";
import { signInHref } from "@/lib/routes";

interface AuthErrorProps {
  className?: string;
}

const AuthError: FC<AuthErrorProps> = ({ className }) => {
  return (
    <CardWrapper
      headerLabel="Something went wrong!"
      backButtonLabel="Quay lại đăng nhập"
      backButtonHref={signInHref}
      noBorderMobile
    />
  );
};

export default AuthError;
