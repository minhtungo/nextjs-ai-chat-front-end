import ContentBox from "@/components/common/ContentBox";
import SectionTitle from "@/components/public/common/SectionTitle";
import Section from "@/components/public/home/Section";
import { FEATURES } from "@/lib/constant";

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
