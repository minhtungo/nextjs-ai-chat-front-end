import NewChatCreation from "@/components/private/chat/NewChatCreation";
import ScrollAreaContainer from "@/components/private/common/ScrollAreaContainer";
import Typography from "@/components/ui/typography";
import { User } from "next-auth";
import { FC } from "react";

interface DashboardProps {
  user: User;
}

const Dashboard: FC<DashboardProps> = ({ user }) => {
  return (
    <ScrollAreaContainer>
      <Typography tag="h1" variant="h3" className="mb-6">
        Welcome to Lumi, {user.name}!
      </Typography>
      <NewChatCreation />
    </ScrollAreaContainer>
  );
};

export default Dashboard;
