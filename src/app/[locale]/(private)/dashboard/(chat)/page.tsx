import { getCurrentUser } from "@/lib/auth";

import Typography from "@/components/ui/typography";
import NewChatCreation from "../../../../../components/private/chat/NewChatCreation";
import Container from "../../../../../components/private/common/Container";

const ChatPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return (
    <Container>
      <Typography tag="h1" variant="h3" className="mb-6">
        Welcome to Lumi, {user.name}!
      </Typography>
      <NewChatCreation />
    </Container>
  );
};

export default ChatPage;

// {
//   Array.from({ length: 3 }).map((_, i) => (
//     <Card
//       key={`chat-${i}`}
//       className="flex w-fit items-center gap-2 bg-muted/40 p-2.5 sm:p-2.5"
//     >
//       <span className="text-sm font-semibold text-muted-foreground">
//         Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//       </span>
//       <ArrowRight className="size-4" />
//     </Card>
//   ));
// }
