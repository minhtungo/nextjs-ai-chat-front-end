"use server";

import { cookies } from "next/headers";

export const updatePreferredLang = (nextLocale: string) => {
  cookies().set("preferredLang", nextLocale);
};
