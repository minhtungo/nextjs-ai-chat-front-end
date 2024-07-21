"use client";

import Typography from "@/components/ui/typography";
import { chatStore } from "@/store/chat";

const HeaderTitle = () => {
  const {
    getChat: { subject, title },
  } = chatStore();
  return (
    <Typography tag="h1" variant="h5" className="font-normal capitalize">
      {title || subject || "Dashboard"}
    </Typography>
  );
};

export default HeaderTitle;
