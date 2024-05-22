import * as React from "react";
import { Html, Link, Body, Text } from "@react-email/components";

interface EmailNotiChangePasswordProps {
  name: string;
  currentTime: string;
}

export const EmailNotiChangePassword: React.FC<
  Readonly<EmailNotiChangePasswordProps>
> = ({ name, currentTime }) => (
  <Html>
    <Body>
      <Text>Hi {name}</Text>
      <Text>
        This is an automated message to notify you that your Lumi account
        password was changed on {currentTime}.
      </Text>
      <Text>
        If you did not request this action, please contact us immediately.
      </Text>
    </Body>
  </Html>
);
