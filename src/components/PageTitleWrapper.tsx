import { FC } from "react";
import Typography from "./ui/typography";
import { cn } from "@/lib/utils";

interface PageTitleWrapperProps {
  title: string;
  description?: string;
  className?: string;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        "mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center text-center sm:mb-14",
        className,
      )}
    >
      <Typography variant="h2" tag="h1">
        {title}
      </Typography>
      {description && (
        <Typography
          variant="h5"
          tag="p"
          className="mt-4 font-normal text-muted-foreground"
        >
          {description}
        </Typography>
      )}
    </div>
  );
};

export default PageTitleWrapper;
