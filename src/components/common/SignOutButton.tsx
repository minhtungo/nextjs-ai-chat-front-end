"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button
      onClick={async () =>
        await signOut({
          callbackUrl: "/",
        })
      }
      className="w-full"
    >
      <LogOut className="size-4" /> Đăng xuất
    </Button>
  );
};

export default SignOutButton;
