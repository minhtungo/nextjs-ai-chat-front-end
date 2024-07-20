import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC, ReactNode } from "react";
import BackButton from "../private/common/BackButton";
import { cn } from "@/lib/utils";

interface cardWrapperProps {
  children?: ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  description?: string;
  className?: string;
  noBorder?: boolean;
}

const CardWrapper: FC<cardWrapperProps> = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  description,
  className,
  noBorder,
}) => {
  return (
    <Card className="mx-auto w-full max-w-md" noBorder={noBorder}>
      <CardHeader
        className="items-center justify-center pb-6 pt-0 sm:pb-6"
        noBorder={noBorder}
      >
        <CardTitle className="text-2xl">{headerLabel}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent
        className={cn("pb-0 sm:pb-0", className)}
        noBorder={noBorder}
      >
        {children}
        {backButtonHref && backButtonLabel && (
          <BackButton
            className="mt-3"
            href={backButtonHref}
            label={backButtonLabel}
            variant="outline"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CardWrapper;
