"use client";

import { Provider } from "jotai";

export default function JoTaiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
