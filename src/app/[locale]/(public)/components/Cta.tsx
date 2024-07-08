import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { FC } from "react";

interface ctaProps {}

const CTA: FC<ctaProps> = () => {
  return (
    <div className="rounded-lg bg-muted p-8 sm:p-12 md:p-16">
      <div className="flex flex-col items-center justify-center gap-y-4 text-center">
        <Typography variant="h2">More than Just a Chatbot</Typography>
        <Typography variant="p" className="text-muted-foreground">
          Our mission is to empower students to achieve their academic goals
          with the help of cutting-edge AI technology. We believe that
          personalized, high-impact tutoring can make a significant difference
          in a student's learning journey.
        </Typography>
        <Button size="lg">Get </Button>
      </div>
    </div>
  );
};

export default CTA;
