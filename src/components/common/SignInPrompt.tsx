import { signUpUrl } from "@/config/config";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import Link from "next/link";

interface SignInPromptProps {
  title?: string;
  description?: string;
}

const SignInPrompt = ({
  title = "Unlock More",
  description = "You must be logged in to view the chat history",
}: SignInPromptProps) => {
  return (
    <Card className="bg-muted/50 p-4 text-sm shadow sm:p-4">
      <div className="mb-2 flex items-center gap-x-2">
        <Lock className="size-4" />
        <p className="font-medium">{title}</p>
      </div>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <Link
        className={cn(
          buttonVariants({
            size: "sm",
          }),
        )}
        href={signUpUrl}
      >
        Get Started
      </Link>
    </Card>
  );
};

export default SignInPrompt;
