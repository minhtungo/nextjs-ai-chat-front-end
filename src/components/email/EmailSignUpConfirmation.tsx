import * as React from "react";

interface EmailSignUpConfirmationProps {
  confirmationLink: string;
}

export const EmailSignUpConfirmation: React.FC<
  Readonly<EmailSignUpConfirmationProps>
> = ({ confirmationLink }) => (
  <div>
    <a href={confirmationLink}>{confirmationLink}</a>
  </div>
);
