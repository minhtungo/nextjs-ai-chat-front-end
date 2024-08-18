import { FC } from "react";

interface ContentBoxProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ContentBox: FC<ContentBoxProps> = ({ title, description, icon }) => {
  return (
    <div className="relative pl-16" data-aos="fade-up">
      <dt className="text-base font-semibold leading-7">
        <h3>{title}</h3>
        <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg border text-primary shadow">
          {icon}
        </div>
      </dt>
      <dd className="mt-2 text-base leading-7 text-muted-foreground">
        {description}
      </dd>
    </div>
  );
};

export default ContentBox;
