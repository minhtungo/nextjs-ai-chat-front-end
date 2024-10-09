"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

const SignOutButton = () => {
  const t = useTranslations("common.Navbar");
  return (
    <Button
      onClick={async () =>
        await signOut({
          callbackUrl: "/",
        })
      }
      variant={"outline"}
      size="sm"
      className="w-full"
    >
      <LogOut className="size-4" /> {t("SignOut.title")}
    </Button>
  );
};

export default SignOutButton;
