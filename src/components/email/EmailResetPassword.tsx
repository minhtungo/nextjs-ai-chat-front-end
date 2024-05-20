import * as React from "react";
import { Html, Link } from "@react-email/components";

interface EmailResetPasswordProps {
  resetPasswordLink: string;
}

export const EmailResetPassword: React.FC<
  Readonly<EmailResetPasswordProps>
> = ({ resetPasswordLink }) => (
  <Html>
    <Link href={resetPasswordLink}>Link</Link>
  </Html>
);
