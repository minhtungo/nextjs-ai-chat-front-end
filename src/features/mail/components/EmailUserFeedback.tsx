import { FC } from "react";

interface EmailUserFeedbackProps {
  userEmail: string;
  userName: string;
  subject: string;
  content: string;
}

const EmailUserFeedback: FC<EmailUserFeedbackProps> = ({
  userEmail,
  userName,
  subject,
  content,
}) => {
  return <div></div>;
};

export default EmailUserFeedback;
