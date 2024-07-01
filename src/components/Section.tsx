import { FC } from "react";

interface SectionProps {
  children: React.ReactNode;
}

const Section: FC<SectionProps> = ({ children }) => {
  return <div className="my-20 sm:my-24">{children}</div>;
};

export default Section;
