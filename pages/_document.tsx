import { Html, Head, Main, NextScript } from "next/document";
import { metadata } from "./layout";

export default function Document() {
  return (
    <Html>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
