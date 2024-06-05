"use client";

import { FC } from "react";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "@/actions/auth";

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
