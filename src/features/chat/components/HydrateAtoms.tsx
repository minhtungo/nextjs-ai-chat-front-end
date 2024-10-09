"use client";

import { chatInfoAtom } from "@/features/chat/store/use-chat";
import { useHydrateAtoms } from "jotai/utils";

interface HydrateAtomsProps {
  id?: string;
  userId: string;
}

const HydrateAtoms = ({ id, userId }: HydrateAtomsProps) => {
  useHydrateAtoms([
    [
      chatInfoAtom,
      {
        chatId: id,
        chatUserId: userId,
      },
    ],
  ]);

  return <></>;
};

export default HydrateAtoms;
