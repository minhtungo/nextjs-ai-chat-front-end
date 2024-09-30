"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface LogoutButtonProps {}

const LogoutButton = ({}: LogoutButtonProps) => {
  return (
    <Button
      onClick={async () =>
        await signOut({
          callbackUrl: "/",
        })
      }
      className="w-full"
    >
      <LogOut className="h-4 w-4" /> Đăng xuất
    </Button>
  );
};

export default LogoutButton;
