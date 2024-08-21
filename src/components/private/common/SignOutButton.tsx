"use client";

import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface SignOutButtonProps {
  title: string;
}

const SignOutButton: FC<SignOutButtonProps> = ({ title }) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={async () => {
        await signOut();
      }}
    >
      {title}
    </Button>
  );
};

export default SignOutButton;
