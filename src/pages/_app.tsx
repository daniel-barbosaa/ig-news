import { AppProps } from "next/app";
import "../../styles/global.scss";
import Header from "../components/Header";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </ChakraProvider>
  );
}
