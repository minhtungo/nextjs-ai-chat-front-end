import ContentBox from "@/components/ContentBox";
import Section from "@/components/Section";
import SectionTitleWrapper from "@/components/SectionTitleWrapper";
import { FEATURES } from "@/lib/constant";

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
