import { FC } from "react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";

interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
  variant?: "default" | "center";
}

const SectionTitle: FC<SectionTitleProps> = ({
  title,
  description,
  className,
  variant = "default",
}) => {
  return (
    <div
      className={cn(
        "mb-4 whitespace-pre-line",
        variant === "center" &&
          "mx-auto mb-12 text-left lg:mb-16 lg:max-w-2xl lg:text-center",
        className,
      )}
    >
      <h2
        className="mb-1 text-base font-medium leading-relaxed text-primary"
        data-aos="fade-up"
      >
        {title}
      </h2>
      {title && (
        <Typography
          variant="h2"
          tag="p"
          className="font-normal"
          data-aos="fade-up"
        >
          {description}
        </Typography>
      )}
    </div>
  );
};

export default SectionTitle;
