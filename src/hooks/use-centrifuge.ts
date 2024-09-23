import { centrifugeAtom, connectCentrifugeAtom } from "@/atoms/centrifuge";
import { useAtomValue, useSetAtom } from "jotai";

export const useCentrifuge = () => {
  return {
    centrifuge: useAtomValue(centrifugeAtom),
    connectCentrifuge: useSetAtom(connectCentrifugeAtom),
  };
};
