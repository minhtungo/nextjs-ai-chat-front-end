import ContentBox from "@/components/ContentBox";
import Section from "@/components/Section";
import SectionTitleWrapper from "@/components/SectionTitleWrapper";
import { FEATURES } from "@/lib/constant";
import { FC } from "react";

interface FeaturesProps {}

const Features: FC<FeaturesProps> = () => {
  return (
    <Section>
      <SectionTitleWrapper
        title="Everything you need for successful online learning"
        subtitle="Unified platform"
      />
      <dl className="mx-auto mt-12 max-w-5xl">
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-14">
          {FEATURES.map((feature) => (
            <ContentBox
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </dl>
    </Section>
  );
};

export default Features;
