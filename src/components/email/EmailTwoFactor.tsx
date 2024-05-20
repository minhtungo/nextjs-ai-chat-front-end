import { Body, Html, Link } from "@react-email/components";
import * as React from "react";

interface EmailTwoFactorProps {
  token: string;
}

export const EmailTwoFactor: React.FC<Readonly<EmailTwoFactorProps>> = ({
  token,
}) => (
  <Html>
    <Body>{token}</Body>
  </Html>
);
