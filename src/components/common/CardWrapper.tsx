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
  noBorderMobile?: boolean;
}

const CardWrapper: FC<cardWrapperProps> = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  description,
  className,
  noBorderMobile,
}) => {
  return (
    <Card
      className="mx-auto w-full max-w-[485px]"
      noBorderMobile={noBorderMobile}
    >
      <CardHeader className="items-center">
        <CardTitle>{headerLabel}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn(className)}>
        {children}
        {backButtonHref && backButtonLabel && (
          <BackButton
            className="mt-2.5"
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
