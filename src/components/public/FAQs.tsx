import Section from "@/components/public/common/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Typography from "@/components/ui/typography";
import { FAQs as QUESTIONS } from "@/content/landing";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface FAQsProps {
  className?: string;
}

const FAQs: FC<FAQsProps> = ({ className }) => {
  return (
    <Section className={cn("mx-auto max-w-5xl", className)}>
      <Typography variant="h2" tag="h3" className="mb-8" data-aos="fade-up">
        Câu hỏi thường gặp
      </Typography>
      <Accordion type="multiple" data-aos="fade-up">
        {QUESTIONS.map((faq) => (
          <AccordionItem value={faq.title} key={faq.title}>
            <AccordionTrigger>{faq.title}</AccordionTrigger>
            <AccordionContent>{faq.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};

export default FAQs;
