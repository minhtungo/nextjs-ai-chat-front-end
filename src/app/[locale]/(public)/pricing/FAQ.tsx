import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQs } from "@/lib/constant";

const FAQ = () => {
  return (
    <Accordion type="multiple">
      {FAQs.map((faq) => (
        <AccordionItem value={faq.title} key={faq.title}>
          <AccordionTrigger>{faq.title}</AccordionTrigger>
          <AccordionContent>{faq.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQ;
