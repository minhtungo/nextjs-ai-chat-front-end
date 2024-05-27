import * as React from "react";

import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  showBorderOnMobile?: boolean;
  noBorder?: boolean;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, showBorderOnMobile, noBorder, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-card text-card-foreground",
        showBorderOnMobile ? "border shadow-sm" : "sm:border sm:shadow-sm",
        noBorder && "sm:border-none sm:shadow-none",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, showBorderOnMobile, noBorder, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 sm:p-6",
        showBorderOnMobile ? "p-4" : "px-0 py-4",
        noBorder && "p-0 sm:p-0",
        className,
      )}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold capitalize leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, showBorderOnMobile, noBorder, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "pt-0 sm:p-6 sm:pt-0",
        showBorderOnMobile ? "p-4" : "px-0 py-4",
        noBorder && "p-0 sm:p-0",
        className,
      )}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, showBorderOnMobile, noBorder, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center pt-0 sm:p-6 sm:pt-0",
        showBorderOnMobile ? "p-4" : "px-0 py-4",
        noBorder && "p-0 sm:p-0",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
