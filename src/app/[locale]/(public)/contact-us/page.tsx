import ContactUsForm from "@/app/[locale]/(public)/contact-us/ContactForm";
import Page from "@/components/layout/Page";
import PageHeader from "@/components/layout/PageHeader";
import PageTitle from "@/components/layout/PageTitle";
import { unstable_setRequestLocale } from "next-intl/server";

const ContactUsPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  return (
    <Page>
      <PageHeader>
        <PageTitle
          title="Contact Us"
          description="Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolores!"
        />
      </PageHeader>
      <ContactUsForm />
    </Page>
  );
};

export default ContactUsPage;
