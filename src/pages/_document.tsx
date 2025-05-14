import { Html, Head, Main, NextScript } from "next/document";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};
const theme = extendTheme({ config });

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="loader-root"></div>
      </body>
    </Html>
  );
}
