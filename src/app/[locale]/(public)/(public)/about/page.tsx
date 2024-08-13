import Typography from "@/components/ui/typography";
import parse from "html-react-parser";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { sanitize } from "isomorphic-dompurify";
import Section from "@/components/public/home/Section";
import PageTitle from "@/components/public/common/PageTitle";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "pages.About" });

  return {
    title: t("title"),
  };
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("public.About");
  return (
    <Section>
      <PageTitle title={t("title")} description={t("subtitle")} />
      <Typography variant="div">
        {parse(sanitize(t.markup("content")))}
      </Typography>
    </Section>
  );
}
