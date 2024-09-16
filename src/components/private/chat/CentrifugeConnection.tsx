"use client";

import { subscribedCentrifugeAtom } from "@/atoms/centrifuge";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

interface CentrifugeConnectionProps {
  token: string;
}

const CentrifugeConnection = ({ token }: CentrifugeConnectionProps) => {
  const setCentrifuge = useSetAtom(subscribedCentrifugeAtom);

  useEffect(() => {
    setCentrifuge(token);
  }, []);
  return <></>;
};

export default CentrifugeConnection;
