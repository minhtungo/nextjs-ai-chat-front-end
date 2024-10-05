import CardWrapper from "@/components/common/CardWrapper";
import { signInUrl } from "@/config/config";

const AuthError = () => {
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
