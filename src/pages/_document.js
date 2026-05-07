
import { Head, Html, Main, NextScript } from "next/document";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});


export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body className={`${montserrat.className} ${montserrat.variable} bg-background text-foreground`}>
          <Main />
          <NextScript />
      </body>
    </Html>
  );
}
