import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-100 px-3 md:px-8 py-16 md:py-20 transition-all">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
