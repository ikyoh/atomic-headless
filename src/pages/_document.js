
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body className="bg-background text-foreground">
          <Main />
          <NextScript />
      </body>
    </Html>
  );
}
