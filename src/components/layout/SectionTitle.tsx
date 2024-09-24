import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.ComponentProps<"div"> {
  title: string;
  description?: string;
  variant?: "default" | "left";
}

const SectionTitle = ({
  title,
  description,
  variant = "default",
  className,
}: SectionTitleProps) => {
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
        <Typography variant="h2" tag="p" data-aos="fade-up">
          {description}
        </Typography>
      )}
    </div>
  );
};

export default SectionTitle;
