import ContentBox from "@/components/common/ContentBox";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/layout/SectionTitle";

import { FEATURES } from "@/content/landing";

const Features = () => {
  return (
    <Section>
      <SectionTitle
        title="Unified platform"
        description="Everything you need for successful online learning"
      />
      <div className="mx-auto max-w-5xl">
        <dl className="grid gap-x-8 gap-y-8 lg:grid-cols-2 lg:gap-y-14">
          {FEATURES.map((feature) => (
            <ContentBox
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </dl>
      </div>
    </Section>
  );
};

export default Features;
