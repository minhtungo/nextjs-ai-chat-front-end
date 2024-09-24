"use client";

import { useCentrifuge } from "@/hooks/use-centrifuge";
import { useEffect } from "react";

interface CentrifugeConnectionProps {
  token: string;
}

const CentrifugeConnection = ({ token }: CentrifugeConnectionProps) => {
  console.log("CentrifugeConnection");
  const { connectCentrifuge } = useCentrifuge();

  useEffect(() => {
    console.log("CentrifugeConnection useEffect");
    connectCentrifuge(token);
  }, []);

  return <></>;
};

export default CentrifugeConnection;
