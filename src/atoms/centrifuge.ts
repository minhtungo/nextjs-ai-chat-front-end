import { env } from "@/config/env";
import { Centrifuge } from "centrifuge";
import { atom } from "jotai";

export const centrifugeAtom = atom<Centrifuge | null>(null);

export const connectCentrifugeAtom = atom(null, (get, set, token: string) => {
  if (get(centrifugeAtom)) {
    return;
  }

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

  set(centrifugeAtom, newCentrifuge);
});

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
