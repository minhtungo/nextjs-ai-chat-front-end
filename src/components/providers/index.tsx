import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";
import { ThemeProvider } from "./ThemeProvider";
import JoTaiProvider from "./JotaiProvider";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <ReactQueryClientProvider>
          <JoTaiProvider>{children}</JoTaiProvider>
        </ReactQueryClientProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
