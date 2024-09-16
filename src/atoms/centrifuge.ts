import { env } from "@/env";
import { Centrifuge } from "centrifuge";
import { atom } from "jotai";
import { toast } from "sonner";

export const centrifugeAtom = atom<Centrifuge | null>(null);

export const subscribedCentrifugeAtom = atom(
  (get) => get(centrifugeAtom),
  async (get, set, token: string) => {
    const currentCentrifuge = get(centrifugeAtom);

    console.log("----subscribedCentrifugeAtom", currentCentrifuge);

    if (currentCentrifuge) {
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

    newCentrifuge.on("connected", (ctx) => {
      console.log("Centrifuge connected:", ctx);
      toast.success("Connected to the server");
    });

    newCentrifuge.on("connecting", (ctx) => {
      toast.info("Connecting to the server...");
    });

    newCentrifuge.on("error", (ctx) => {
      console.error("Centrifuge error:", ctx.error);
      toast.error(ctx.error.message);
    });

    if (newCentrifuge.state === "disconnected") {
      newCentrifuge.connect();
    }

    set(centrifugeAtom, newCentrifuge);
  },
);
