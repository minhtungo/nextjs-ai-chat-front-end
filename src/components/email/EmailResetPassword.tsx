import * as React from "react";

interface EmailResetPasswordProps {
  resetPasswordLink: string;
}

export const EmailResetPassword: React.FC<
  Readonly<EmailResetPasswordProps>
> = ({ resetPasswordLink }) => (
  <div>
    <a href={resetPasswordLink}>{resetPasswordLink}</a>
  </div>
);
