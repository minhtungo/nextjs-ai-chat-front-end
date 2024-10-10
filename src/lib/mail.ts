import { EmailNotiChangePassword } from "@/features/mail/components/EmailNotiChangePassword";
import { EmailResetPassword } from "@/features/mail/components/EmailResetPassword";
import { EmailSignUpConfirmation } from "@/features/mail/components/EmailSignUpConfirmation";
import { EmailTwoFactor } from "@/features/mail/components/EmailTwoFactor";
import EmailUserFeedback from "@/features/mail/components/EmailUserFeedback";
import { Resend } from "resend";
import { formatDate } from "./utils";
import {
  ADMIN_EMAIL,
  emailVerificationUrl,
  resetPasswordUrl,
} from "@/config/config";
import { env } from "@/config/env";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const emailConfirmationLink = `${env.NEXT_PUBLIC_BASE_URL}${emailVerificationUrl}?token=${token}`;

  await resend.emails.send({
    from: ADMIN_EMAIL,
    to: [email],
    subject: "Confirmation Email",
    react: EmailSignUpConfirmation({ confirmationLink: emailConfirmationLink }),
    text: "Confirmation Email",
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordLink = `${env.NEXT_PUBLIC_BASE_URL}${resetPasswordUrl}?token=${token}`;

  await resend.emails.send({
    from: ADMIN_EMAIL,
    to: [email],
    subject: "Reset Password Email",
    react: EmailResetPassword({ resetPasswordLink: resetPasswordLink }),
    text: "Reset Password Email",
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: ADMIN_EMAIL,
    to: [email],
    subject: "Two Factor Code Email",
    react: EmailTwoFactor({ token }),
    text: "Two Factor Code Email",
  });
};

export const sendChangePasswordEmail = async (email: string, name: string) => {
  const currentTime = formatDate(new Date());
  await resend.emails.send({
    from: ADMIN_EMAIL,
    to: [email],
    subject: "Password Change",
    react: EmailNotiChangePassword({ name, currentTime }),
    text: "Two Factor Code Email",
  });
};

export const sendUserFeedbackEmail = async ({
  userEmail,
  userName,
  subject,
  content,
}: {
  userEmail: string;
  userName: string;
  subject: string;
  content: string;
}) => {
  await resend.emails.send({
    from: ADMIN_EMAIL,
    to: ADMIN_EMAIL,
    subject,
    react: EmailUserFeedback({ userEmail, userName, subject, content }),
    text: "Two Factor Code Email",
  });
};
