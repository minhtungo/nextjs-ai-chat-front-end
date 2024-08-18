import { FC } from "react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";

interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
  variant?: "default" | "left";
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
        "mx-auto mb-10 whitespace-pre-line text-left sm:mb-16 lg:max-w-2xl lg:text-center",
        variant === "left" && "mb-4",
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
