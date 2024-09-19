import { subscriptionUrl } from "@/app-config";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Rocket } from "lucide-react";
import Link from "next/link";

const UpgradePrompt = () => {
  return (
    <Card className="bg-muted/50 p-4 text-sm shadow sm:p-4">
      <div className="mb-2 flex items-center gap-x-2">
        <Rocket className="size-4" />
        <p className="font-medium">Unlock More</p>
      </div>
      <Typography className="mb-4 text-sm text-muted-foreground">
        Upgrade for more powerful models, unlimited document and images uploads.
      </Typography>

      <Link
        className={cn(
          buttonVariants({
            size: "sm",
          }),
        )}
        href={subscriptionUrl}
      >
        Upgrade
      </Link>
    </Card>
  );
};

export default UpgradePrompt;
