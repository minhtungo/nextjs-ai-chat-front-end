import { FC } from "react";
import Typography from "./ui/typography";
import { cn } from "@/lib/utils";

interface SectionTitleWrapperProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitleWrapper: FC<SectionTitleWrapperProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <Typography className="text-base font-semibold text-accent-foreground">
        {subtitle}
      </Typography>
      {title && (
        <Typography variant="h2" className="mt-2 font-normal">
          {title}
        </Typography>
      )}
    </div>
  );
};

export default SectionTitleWrapper;
