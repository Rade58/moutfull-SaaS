# Chakra UI

ODAVDE CU IMATI POCETNO UPOZNAVANJE SA CHAKRA UI

<https://docs.react2025.com/feedback/chakra-ui>

ALI JA CU KORISTITI `v1`, ZATO CE MI BITI HELPFUL OVAJ GUIDE

<https://chakra-ui.com/docs/getting-started>

<https://chakra-ui.com/guides/integrations/with-cra>

- `yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4`

# CHAKRA THEME

- `touch styles/theme.ts`

```ts
import { theme as chakraTheme, Theme } from "@chakra-ui/react";

const theme: Theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  fontWeights: {
    ...chakraTheme.fontWeights,
    normal: 400,
    medium: 600,
    bold: 800,
  },
};

export default theme;
```

# PROVIDING CHAKRA

- `code pages/_app.tsx`

```tsx
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
```
