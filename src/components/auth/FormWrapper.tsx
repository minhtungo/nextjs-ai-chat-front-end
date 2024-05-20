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
import BackButton from "./BackButton";

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
      <CardContent>
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

export default FormWrapper;
