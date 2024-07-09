import Section from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Typography from "@/components/ui/typography";
import { FAQs } from "@/lib/constant";

const FAQ = () => {
  return (
    <Section>
      <Typography variant="h3" tag="h2" className="mb-8">
        Câu hỏi thường gặp
      </Typography>
      <Accordion type="multiple">
        {FAQs.map((faq) => (
          <AccordionItem value={faq.title} key={faq.title}>
            <AccordionTrigger>{faq.title}</AccordionTrigger>
            <AccordionContent>{faq.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};

export default FAQ;
