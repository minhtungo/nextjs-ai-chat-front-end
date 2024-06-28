import { FC } from "react";
import { Card } from "../ui/card";
import { UserContent } from "ai";

interface UserMessageProps {
  children: React.ReactNode;
  content: any;
}

const UserMessage: FC<UserMessageProps> = ({ children, content }) => {
  console.log("userMEssage", children);
  return (
    <Card className="ml-auto w-fit bg-secondary p-3 sm:px-4 sm:py-3">
      {children}
    </Card>
  );
};

export default UserMessage;
