import { centrifugeAtom } from "@/atoms/centrifuge";
import { env } from "@/env";
import { Centrifuge } from "centrifuge";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const useCentrifuge = () => {
  const [centrifuge, setCentrifuge] = useAtom(centrifugeAtom);

  const connectCentrifuge = useCallback(
    async (token: string) => {
      if (centrifuge) {
        return;
      }

      console.log("connectCentrifuge  below if");

      const newCentrifuge = new Centrifuge(
        [
          {
            transport: "websocket",
            endpoint: env.NEXT_PUBLIC_WS_ENDPOINT,
          },
        ],
        {
          data: token,
          debug: true,
        },
      );

      setUpCentrifugeListeners(newCentrifuge);

      if (newCentrifuge.state === "disconnected") {
        newCentrifuge.connect();
      }

      setCentrifuge(newCentrifuge);
    },
    [centrifuge],
  );

  return { centrifuge, connectCentrifuge };
};

const setUpCentrifugeListeners = (centrifuge: Centrifuge) => {
  centrifuge.on("connected", (ctx) => {
    console.log("Centrifuge connected:", ctx);
    // toast.success("Connected to the server");
  });

  centrifuge.on("connecting", (ctx) => {
    console.log("Centrifuge connecting:", ctx);
    // toast.info("Connecting to the server...");
  });

  centrifuge.on("error", (ctx) => {
    console.error("Centrifuge error:", ctx.error);
    // toast.error(ctx.error.message);
  });
};
