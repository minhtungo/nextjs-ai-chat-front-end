import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC, ReactNode } from "react";
import BackButton from "./auth/BackButton";
import { cn } from "@/lib/utils";

interface cardWrapperProps {
  children?: ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  description?: string;
  className?: string;
}

const CardWrapper: FC<cardWrapperProps> = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  description,
  className,
}) => {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="pt-0">
        <CardTitle className="text-2xl">{headerLabel}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn(className)}>
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
