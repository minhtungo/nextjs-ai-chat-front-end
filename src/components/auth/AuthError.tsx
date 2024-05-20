import { FC } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthErrorProps {
  className?: string;
}

const AuthError: FC<AuthErrorProps> = ({ className }) => {
  return (
    <Card className="mx-auto w-full max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Something went wrong!</CardTitle>
      </CardHeader>
      <CardFooter>
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href="/sign-in"
        >
          Quay lại đăng nhập
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AuthError;
