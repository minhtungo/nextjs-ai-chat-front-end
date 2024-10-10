import * as React from "react";
import { Html, Link } from "@react-email/components";

interface EmailSignUpConfirmationProps {
  confirmationLink: string;
}

export const EmailSignUpConfirmation: React.FC<
  Readonly<EmailSignUpConfirmationProps>
> = ({ confirmationLink }) => (
  <Html>
    <Link href={confirmationLink}>{confirmationLink}</Link>
  </Html>
);
