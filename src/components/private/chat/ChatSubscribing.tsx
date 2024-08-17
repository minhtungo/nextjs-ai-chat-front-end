"use client";

import { isSubscribedAtom } from "@/atoms/subscription";
import LoadingOverlay from "@/components/private/common/LoadingOverlay";
import { useAtomValue } from "jotai";

const ChatSubscribing = () => {
  const isSubscribed = useAtomValue(isSubscribedAtom);

  return <LoadingOverlay isLoading={!isSubscribed} />;
};

export default ChatSubscribing;
