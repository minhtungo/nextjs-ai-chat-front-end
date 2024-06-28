import parse from "html-react-parser";
import { useTranslations } from "next-intl";
import { FC } from "react";
import Typography from "./ui/typography";
import PageTitleWrapper from "./PageTitleWrapper";

interface AboutUsProps {}

const AboutUs: FC<AboutUsProps> = () => {
  const t = useTranslations("public.About");
  return (
    <>
      <PageTitleWrapper title={t("title")} description={t("subtitle")} />
      <Typography variant="div">{parse(t.markup("content"))}</Typography>
    </>
  );
};

export default AboutUs;
