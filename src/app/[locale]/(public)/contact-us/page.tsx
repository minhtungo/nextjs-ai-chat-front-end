import Section from "@/components/public/home/Section";
import ContactUsForm from "../../../../components/public/ContactForm";
import PageTitleWrapper from "@/components/public/common/PageTitleWrapper";

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
