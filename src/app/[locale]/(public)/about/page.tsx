import PageTitleWrapper from "@/components/PageTitleWrapper";
import Typography from "@/components/ui/typography";
import parse from "html-react-parser";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { sanitize } from "isomorphic-dompurify";

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
    <>
      <PageTitleWrapper title={t("title")} description={t("subtitle")} />
      <Typography variant="div">
        {parse(sanitize(t.markup("content")))}
      </Typography>
    </>
  );
}
