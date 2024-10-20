"use client";

import { setChatCookieAction } from "@/features/chat/actions";
import { useCentrifuge } from "@/features/chat/store/use-centrifuge";
import { useSubscription } from "@/features/chat/store/use-subscription";
import { isGuestUser } from "@/lib/utils";
import { useEffect } from "react";

interface CentrifugeConnectionProps {
  token: string;
  chatId?: string;
  userId: string;
}

const CentrifugeConnection = ({
  userId,
  chatId,
  token,
}: CentrifugeConnectionProps) => {
  const { connectCentrifuge, centrifuge } = useCentrifuge();
  const { setupSubscription } = useSubscription();

  useEffect(() => {
    console.log("CentrifugeConnection connectCentrifuge");
    connectCentrifuge(token);
  }, []);

  useEffect(() => {
    setChatCookieAction({
      token,
      userId,
    });
  }, []);

  useEffect(() => {
    console.log(`CentrifugeConnection setupSubscription rooms ${chatId}`);
    if (!centrifuge || !chatId || isGuestUser(userId)) return;

    setupSubscription(`rooms:${chatId}`);
  }, [centrifuge, chatId]);

  return <></>;
};

export default CentrifugeConnection;
