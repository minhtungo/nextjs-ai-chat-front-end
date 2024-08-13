import { FC } from "react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";

interface PageTitleProps {
  title: string;
  description?: string;
  className?: string;
}

const PageTitle: FC<PageTitleProps> = ({ title, description, className }) => {
  return (
    <div
      className={cn("mx-auto mb-10 max-w-2xl space-y-2 text-center", className)}
    >
      <Typography variant="h2" tag="h1">
        {title}
      </Typography>
      {description && (
        <Typography
          variant="h5"
          tag="p"
          className="font-normal text-muted-foreground"
        >
          {description}
        </Typography>
      )}
    </div>
  );
};

export default PageTitle;
