import { EmailSignUpConfirmation } from "@/components/email/EmailSignUpConfirmation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verification?token=${token}`;

  await resend.emails.send({
    from: "loducfc@gmail.com",
    to: [email],
    subject: "Confirmation Email",
    react: EmailSignUpConfirmation({ confirmationLink: confirmationLink }),
    text: "Confirmation Email",
  });
};
