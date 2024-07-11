import { FC } from "react";

import Container from "@/components/dashboard/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Pen } from "lucide-react";
import { User } from "next-auth";
import NewChatPanel from "./NewChatPanel";

export interface ChatProps extends React.ComponentProps<"div"> {
  user?: User;
}

const NewChat: FC<ChatProps> = ({ user }) => {
  return (
    <>
      <Container className="max-w-5xl">
        <div className="grid h-full w-full flex-1 grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card>
              <CardContent>
                <Pen className="size-4" />
                <span className="text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
      <NewChatPanel user={user!} />
    </>
  );
};

export default NewChat;
