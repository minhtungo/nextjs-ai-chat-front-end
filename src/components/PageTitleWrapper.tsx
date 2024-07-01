import { FC } from "react";
import Typography from "./ui/typography";

interface PageTitleWrapperProps {
  title: string;
  description?: string;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({
  title,
  description,
}) => {
  return (
    <div className="mb-12 mt-12 flex flex-col items-center justify-center text-center sm:mt-16">
      <Typography variant="h2" tag="h1">
        {title}
      </Typography>
      {description && (
        <Typography variant="h5" tag="p" className="mt-4 text-muted-foreground">
          {description}
        </Typography>
      )}
    </div>
  );
};

export default PageTitleWrapper;
