import OverlayWindow from "@/components/common/OverlayWindow";
import { buttonVariants } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import Link from "next/link";

export default function NotFound() {
  return (
    <OverlayWindow
      containerClassName="bg-background"
      className="flex h-full w-full flex-col items-center justify-center gap-y-3 text-center"
    >
      <Typography variant="h3">404 Not Found</Typography>

      <div className="flex flex-wrap gap-3">
        <Link className={buttonVariants({ variant: "outline" })} href="/">
          Go Home
        </Link>
      </div>
      <div className="my-4 w-full max-w-sm border-t">
        <Link
          className={buttonVariants({
            variant: "link",
            className: "mt-4 !text-muted-foreground",
          })}
          href="/"
        >
          Contact Us
        </Link>
      </div>
    </OverlayWindow>
  );
}
