"use client";

import Typography from "@/components/ui/typography";
import { chatStore } from "@/store/chat";

const HeaderTitle = () => {
  const {
    getChat: { subject },
  } = chatStore();
  return (
    <Typography tag="h1" variant="h5" className="font-normal capitalize">
      {subject && subject.length > 0 ? subject : "Dashboard"}
    </Typography>
  );
};

export default HeaderTitle;
