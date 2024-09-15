import { FC } from "react";
import CardWrapper from "@/components/common/CardWrapper";
import { signInUrl } from "@/app-config";

interface AuthErrorProps {
  className?: string;
}

const AuthError: FC<AuthErrorProps> = ({ className }) => {
  return (
    <CardWrapper
      headerLabel="Something went wrong!"
      backButtonLabel="Quay lại đăng nhập"
      backButtonHref={signInUrl}
      noBorderMobile
    />
  );
};

export default AuthError;
