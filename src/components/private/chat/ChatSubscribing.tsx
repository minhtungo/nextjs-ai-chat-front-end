"use client";

import { isSubscribedAtom } from "@/atoms/subscription";
import OverlayWindow from "@/components/common/OverlayWindow";
import Spinner from "@/components/common/Spinner";
import { useAtomValue } from "jotai";

const ChatSubscribing = () => {
  const isSubscribed = useAtomValue(isSubscribedAtom);

  if (isSubscribed) return null;

  return (
    <OverlayWindow
      containerClassName="bg-accent/40"
      className="flex h-full w-full items-center justify-center"
    >
      <Spinner className="size-6 sm:size-8" />
    </OverlayWindow>
  );
};

export default ChatSubscribing;
