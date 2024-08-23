import NewChatCreation from "@/components/private/chat/NewChatCreation";
import ScrollAreaContainer from "@/components/private/common/ScrollAreaContainer";
import Typography from "@/components/ui/typography";
import { getCurrentUser } from "@/lib/auth";
import { User } from "next-auth";
import { FC, Suspense, use } from "react";

interface NewChatWelcomeProps {}

const ChatWelcomeGreeting = ({
  userPromise,
}: {
  userPromise: Promise<User | undefined>;
}) => {
  const user = use(userPromise);

  return (
    <Typography tag="h1" variant="h3" className="mb-6">
      Welcome back, {user?.name}!
    </Typography>
  );
};

const NewChatWelcome: FC<NewChatWelcomeProps> = () => {
  const user = getCurrentUser();

  return (
    <ScrollAreaContainer>
      <Suspense fallback={<h1>Loading...</h1>}>
        <ChatWelcomeGreeting userPromise={user} />
      </Suspense>
      <NewChatCreation />
    </ScrollAreaContainer>
  );
};

export default NewChatWelcome;
