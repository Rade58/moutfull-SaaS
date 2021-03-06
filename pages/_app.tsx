/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import "../styles/globals.css";
import type { AppProps } from "next/app";
// CHAKRA
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../styles/theme";
//

import { AuthProvider } from "../lib/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <CSSReset />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
