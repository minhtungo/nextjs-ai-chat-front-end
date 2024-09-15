import Typography from "@/components/ui/typography";
import { ComponentProps, FC } from "react";

interface ContentSectionProps extends ComponentProps<"div"> {
  title: string;
}

const ContentSection = ({ title, children }: ContentSectionProps) => {
  return (
    <>
      <Typography variant="h4" tag="h2" className="mb-3 mt-6">
        {title}
      </Typography>
      <div className="space-y-4 text-base font-normal text-muted-foreground">
        {children}
      </div>
    </>
  );
};

export default ContentSection;
