"use client";

import { encodeDataAction } from "@/actions/centrifuge";
import NewChatCreation from "@/components/private/chat/NewChatCreation";
import Container from "@/components/private/common/Container";
import Typography from "@/components/ui/typography";
import { useCentrifuge } from "@/store/centrifuge";
import { getConnectionToken } from "@/use-cases/centrifugo";
import { Centrifuge, State } from "centrifuge";
import { User } from "next-auth";
import { FC, useEffect } from "react";

interface DashboardProps {
  user: User;
  encodedData: string;
}

const Dashboard: FC<DashboardProps> = ({ user, encodedData }) => {
  const [centrifuge, setCentrifuge] = useCentrifuge();

  useEffect(() => {
    if (!centrifuge) {
      const newCentrifuge = new Centrifuge(
        process.env.NEXT_PUBLIC_WS_ENDPOINT!,
        {
          getToken: getConnectionToken,
          debug: true,
          data: encodedData,
        },
      );
      setCentrifuge(newCentrifuge);
      newCentrifuge.on("connected", (ctx) => {
        console.log(`-----connected ${ctx}`);
      });
      newCentrifuge.on("error", (ctx) => {
        console.log(`======================= error ${ctx.error}`);
      });
      if (newCentrifuge.state === State.Disconnected) {
        newCentrifuge.connect();
      }
      return () => {
        newCentrifuge.disconnect();
        setCentrifuge(null);
      };
    }
  }, []);

  return (
    <Container>
      <Typography tag="h1" variant="h3" className="mb-6">
        Welcome to Lumi, {user.name}!
      </Typography>
      <NewChatCreation />
    </Container>
  );
};

export default Dashboard;
