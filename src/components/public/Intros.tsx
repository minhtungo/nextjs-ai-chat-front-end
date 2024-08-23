import SectionTitle from "@/components/public/common/SectionTitle";
import IntroBlock from "@/components/public/IntroBlock";
import Section from "@/components/public/common/Section";
import { INTRO_BLOCKS } from "@/content/landing";

const Intros = () => {
  return (
    <Section>
      <SectionTitle
        title="AI-Powered Learning"
        description="Everything you need to get better grades"
      />
      <div className="grid gap-y-10 sm:gap-y-16 lg:gap-y-24">
        {INTRO_BLOCKS.map((intro, index) => (
          <IntroBlock key={`intro-${intro.title}-${index}`} intro={intro} />
        ))}
      </div>
    </Section>
  );
};

export default Intros;
