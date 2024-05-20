import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { buttonVariants } from "../ui/button";

interface formWrapperProps {
  children?: ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

const FormWrapper: FC<formWrapperProps> = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
}) => {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {backButtonHref && backButtonLabel && (
        <CardFooter>
          <Link
            href={backButtonHref}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            {backButtonLabel}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default FormWrapper;
