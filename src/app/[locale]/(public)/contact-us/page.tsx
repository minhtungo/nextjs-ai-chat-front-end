import PageTitleWrapper from "@/components/PageTitleWrapper";
import Section from "@/components/Section";
import ContactUsForm from "./ContactForm";

const ContactUsPage = async () => {
  return (
    <Section>
      <PageTitleWrapper
        title="Contact Us"
        description="Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolores!"
      />
      <ContactUsForm />
    </Section>
  );
};

export default ContactUsPage;
