import { FC } from "react";
import { Card } from "@/components/ui/card";

interface ContentBoxProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ContentBox: FC<ContentBoxProps> = ({ title, description, icon }) => {
  return (
    <div className="relative pl-16">
      <dt className="text-base font-semibold leading-7">
        <h3>{title}</h3>
        <Card className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center">
          {icon}
        </Card>
      </dt>
      <dd className="mt-2 text-base leading-7 text-muted-foreground">
        {description}
      </dd>
    </div>
  );
};

export default ContentBox;
