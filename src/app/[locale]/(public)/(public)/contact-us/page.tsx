import Section from "@/components/public/home/Section";
import PageTitle from "@/components/public/common/PageTitle";
import ContactUsForm from "@/components/public/ContactForm";

const ContactUsPage = async () => {
  return (
    <Section>
      <PageTitle
        title="Contact Us"
        description="Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolores!"
      />
      <ContactUsForm />
    </Section>
  );
};

export default ContactUsPage;
