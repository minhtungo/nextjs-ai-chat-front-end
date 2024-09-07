import { signInUrl } from "@/app-config";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface SignInPromptProps {}

const SignInPrompt: FC<SignInPromptProps> = () => {
  return (
    <Card className="bg-muted/20 p-4 text-sm sm:p-4">
      <div className="mb-1 flex items-center gap-x-2">
        <Lock className="size-4" />
        <p className="font-medium">Unlock More</p>
      </div>
      <p className="mb-4 text-muted-foreground">
        You must be logged in to view the chat history
      </p>
      <Link
        className={cn(
          buttonVariants({
            size: "sm",
          }),
          "w-full justify-start",
        )}
        href={signInUrl}
      >
        Login
      </Link>
    </Card>
  );
};

export default SignInPrompt;
