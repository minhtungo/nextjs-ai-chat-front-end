import { FC } from "react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";

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
    <div
      className={cn(
        "mx-auto mb-12 text-left lg:mb-16 lg:max-w-2xl lg:text-center",
        className,
      )}
    >
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
