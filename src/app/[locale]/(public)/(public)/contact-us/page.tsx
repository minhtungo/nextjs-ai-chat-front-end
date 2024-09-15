import Page from "@/components/public/common/Page";
import PageHeader from "@/components/public/common/PageHeader";
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
