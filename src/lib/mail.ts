import { EmailSignUpConfirmation } from "@/components/email/EmailSignUpConfirmation";
import { emailVerificationHref } from "@/routes";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const fromEmail = "onboarding@resend.dev";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXT_PUBLIC_BASE_URL}${emailVerificationHref}?token=${token}`;

  await resend.emails.send({
    from: fromEmail,
    to: [email],
    subject: "Confirmation Email",
    react: EmailSignUpConfirmation({ confirmationLink: confirmationLink }),
    text: "Confirmation Email",
  });
};
