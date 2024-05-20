import * as React from "react";

interface EmailSignUpConfirmationProps {
  confirmationLink: string;
}

export const EmailSignUpConfirmation: React.FC<
  Readonly<EmailSignUpConfirmationProps>
> = ({ confirmationLink }) => (
  <a href={confirmationLink} target="_blank">
    {confirmationLink}!
  </a>
);
