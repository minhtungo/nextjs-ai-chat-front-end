import { EmailResetPassword } from "@/components/email/EmailResetPassword";
import { EmailSignUpConfirmation } from "@/components/email/EmailSignUpConfirmation";
import { EmailTwoFactor } from "@/components/email/EmailTwoFactor";
import { emailVerificationHref, resetPasswordHref } from "@/routes";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const fromEmail = "onboarding@resend.dev";

export const sendVerificationEmail = async (email: string, token: string) => {
  const emailConfirmationLink = `${process.env.NEXT_PUBLIC_BASE_URL}${emailVerificationHref}?token=${token}`;

  await resend.emails.send({
    from: fromEmail,
    to: [email],
    subject: "Confirmation Email",
    react: EmailSignUpConfirmation({ confirmationLink: emailConfirmationLink }),
    text: "Confirmation Email",
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordLink = `${process.env.NEXT_PUBLIC_BASE_URL}${resetPasswordHref}?token=${token}`;

  await resend.emails.send({
    from: fromEmail,
    to: [email],
    subject: "Reset Password Email",
    react: EmailResetPassword({ resetPasswordLink: resetPasswordLink }),
    text: "Reset Password Email",
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: fromEmail,
    to: [email],
    subject: "Two Factor Code Email",
    react: EmailTwoFactor({ token }),
    text: "Two Factor Code Email",
  });
};
