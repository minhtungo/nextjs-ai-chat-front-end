import Section from "@/components/public/common/Section";
import PageTitle from "@/components/public/common/PageTitle";
import ContactUsForm from "@/components/public/ContactForm";
import { unstable_setRequestLocale } from "next-intl/server";

const ContactUsPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
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
