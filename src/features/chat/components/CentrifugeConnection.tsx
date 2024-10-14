"use client";

import { cookie } from "@/config/config";
import { useCentrifuge } from "@/features/chat/store/use-centrifuge";
import { useSubscription } from "@/features/chat/store/use-subscription";
import { isGuestUser } from "@/lib/utils";
import { setCookie } from "cookies-next";
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
    setCookie(cookie.chat.token, token, {
      expires: new Date(Date.now() + cookie.chat.expires),
      path: "/",
      sameSite: "lax",
    });
    setCookie(cookie.chat.userId, {
      expires: new Date(Date.now() + cookie.chat.expires),
      path: "/",
      sameSite: "lax",
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
