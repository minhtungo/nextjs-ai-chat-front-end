import { getTokenAction } from "@/actions/api";
import { Centrifuge } from "centrifuge";
import { atom } from "jotai";
import { toast } from "sonner";
import { env } from "@/env";

export const centrifugeAtom = atom<Centrifuge | null>(null);

export const subscribedCentrifugeAtom = atom(
  (get) => get(centrifugeAtom),
  async (get, set) => {
    const currentCentrifuge = get(centrifugeAtom);

    console.log("----subscribedCentrifugeAtom", currentCentrifuge);

    if (currentCentrifuge) {
      return;
    }

    console.log("----subscribedCentrifugeAtom below if", currentCentrifuge);

    const [data, error] = await getTokenAction();

    console.log("*****************connectToCentrifugeAction", data);

    if (error) {
      toast.error(error.message);
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
        data: data?.token,
        debug: true,
      },
    );

    newCentrifuge.on("connected", (ctx) => {
      console.log("Centrifuge connected:", ctx);
      // toast.success("Connected to the server");
    });

    newCentrifuge.on("connecting", (ctx) => {
      toast.info("Connecting to the server...");
    });

    newCentrifuge.on("error", (ctx) => {
      console.error("Centrifuge error:", ctx.error);
    });

    if (newCentrifuge.state === "disconnected") {
      newCentrifuge.connect();
    }

    set(centrifugeAtom, newCentrifuge);
  },
);

subscribedCentrifugeAtom.onMount = (setAtom) => {
  console.log("----subscribedCentrifugeAtom.onMount");
  setAtom();
};
