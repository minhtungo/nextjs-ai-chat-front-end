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
    <div className={cn("mb-4", className)}>
      <Typography variant="h5" tag="h1" className="leading-normal">
        {title}
      </Typography>
      {description && (
        <Typography tag="p" className="font-normal text-muted-foreground">
          {description}
        </Typography>
      )}
    </div>
  );
};

export default PageTitle;
