import Typography from "@/components/ui/typography";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <>
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
    </>
  );
};

export default PageTitle;
