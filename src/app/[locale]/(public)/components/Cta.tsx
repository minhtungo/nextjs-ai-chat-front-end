import Section from "@/components/Section";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

interface ctaProps {}

const CTA: FC<ctaProps> = () => {
  return (
    <Section>
      <Card className="p-4 sm:p-8 md:px-10 md:py-8">
        <div className="flex flex-col items-center justify-center gap-y-4 text-center">
          <Typography variant="h2">More than Just a Chatbot</Typography>
          <Typography variant="p" className="text-muted-foreground">
            Our mission is to empower students to achieve their academic goals
            with the help of cutting-edge AI technology. We believe that
            personalized, high-impact tutoring can make a significant difference
            in a student's learning journey.
          </Typography>
          <Link
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "mt-2",
            )}
            href="/auth/sign-up"
          >
            Get Started
          </Link>
        </div>
      </Card>
    </Section>
  );
};

export default CTA;
