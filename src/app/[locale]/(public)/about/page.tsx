import Typography from "@/components/ui/typography";
import parse from "html-react-parser";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { sanitize } from "isomorphic-dompurify";
import PageTitle from "@/components/layout/PageTitle";
import Page from "@/components/layout/Page";
import PageHeader from "@/components/layout/PageHeader";

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
    <Page>
      <PageHeader>
        <PageTitle title={t("title")} description={t("subtitle")} />
      </PageHeader>
      <Typography variant="div">
        {parse(sanitize(t.markup("content")))}
      </Typography>
    </Page>
  );
}
