"use client";

import { Provider } from "jotai";

export default async function JoTaiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
