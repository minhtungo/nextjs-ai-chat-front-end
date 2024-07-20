import ContentBox from "@/components/common/ContentBox";
import Section from "@/components/public/home/Section";
import { FEATURES } from "@/lib/constant";
import SectionTitleWrapper from "@/components/public/common/SectionTitleWrapper";

const Features = () => {
  return (
    <Section>
      <SectionTitleWrapper
        title="Everything you need for successful online learning"
        subtitle="Unified platform"
      />
      <div className="mx-auto max-w-6xl">
        <dl className="grid gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-14">
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
