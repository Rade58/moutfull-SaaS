/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import "../styles/globals.css";
import type { AppProps } from "next/app";
//
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../styles/theme";
//

import { AuthProvider } from "../lib/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
