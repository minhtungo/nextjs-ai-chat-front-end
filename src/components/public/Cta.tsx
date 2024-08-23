import { signUpUrl } from "@/app-config";
import Section from "@/components/public/common/Section";
import { buttonVariants } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CTA = () => {
  return (
    <Section className="mx-auto max-w-5xl sm:text-center">
      <Typography variant="h2" className="mb-4" data-aos="fade-up">
        Discover a new way to learn with AI Tutor
      </Typography>
      <Typography
        variant="p"
        className="mb-8 text-lg text-muted-foreground"
        data-aos="fade-up"
      >
        Our mission is to empower students to achieve their academic goals with
        the help of cutting-edge AI technology. We believe that personalized,
        high-impact tutoring can make a significant difference in a student's
        learning journey.
      </Typography>

      <Link
        className={cn(
          buttonVariants({ variant: "default", className: "w-full sm:w-auto" }),
        )}
        href={signUpUrl}
        data-aos="fade-up"
      >
        Try for free
      </Link>
    </Section>
  );
};

export default CTA;
