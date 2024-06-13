import { FC } from "react";
import { Card } from "../ui/card";

interface UserMessageProps {
  children: React.ReactNode;
}

const UserMessage: FC<UserMessageProps> = ({ children }) => {
  console.log("--------------", children);
  return (
    <Card className="ml-auto w-fit bg-secondary p-3 sm:px-4 sm:py-3">
      {children}
    </Card>
  );
};

export default UserMessage;
