import { FC } from "react";

import Container from "@/components/dashboard/Container";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { User } from "next-auth";
import NewChatPanel from "./NewChatPanel";

export interface ChatProps extends React.ComponentProps<"div"> {
  user?: User;
}

const NewChat: FC<ChatProps> = ({ user }) => {
  return (
    <>
      <Container className="max-w-5xl">
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={`chat-${i}`}
              className="flex w-fit items-center gap-2 bg-muted/40 p-2.5 sm:p-2.5"
            >
              <span className="text-sm font-semibold text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </span>
              <ArrowRight className="size-4" />
            </Card>
          ))}
        </div>
      </Container>
      <NewChatPanel user={user!} />
    </>
  );
};

export default NewChat;
