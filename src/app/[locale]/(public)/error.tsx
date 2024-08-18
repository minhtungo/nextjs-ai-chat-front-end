"use client"; // Error components must be Client Components

import OverlayWindow from "@/components/common/OverlayWindow";
import { Button, buttonVariants } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <OverlayWindow
      containerClassName="bg-background"
      className="flex h-full w-full flex-col items-center justify-center gap-y-3 text-center"
    >
      <Typography variant="h3">Opps, Something went wrong!</Typography>
      <Typography className="max-w-xl text-muted-foreground">
        {error.message}
      </Typography>
      <div className="flex flex-wrap gap-3">
        <Link className={buttonVariants({ variant: "outline" })} href="/">
          Go Home
        </Link>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
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
