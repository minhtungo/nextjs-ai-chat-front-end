import { cookies } from "next/headers";
import { getUserMails } from "@/data/mail";
import { getCurrentUser } from "@/lib/auth";
import { Mail } from "@/features/mail/components/Mail";

const EmailPage = async () => {
  const user = await getCurrentUser();

  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout =
    layout && layout.value ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = undefined;

  const mails = await getUserMails({
    userId: user?.id!,
  });
  // const defaultCollapsed =
  //   collapsed && collapsed.value ? JSON.parse(collapsed.value) : undefined;
  return (
    <Mail
      mails={mails}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
    />
  );
};

export default EmailPage;
