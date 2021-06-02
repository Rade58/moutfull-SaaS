# ABSOLUTE IMPORTS AND ALIASES

<https://nextjs.org/docs/advanced-features/module-path-aliases>

<https://docs.react2025.com/feedback/absolute-imports>

DODAJE SE `"baseUrl"` FIELD U `tsconfig.json` ILI `jsconfig.json` (U OKVIRU `"compilerOptions"`)

A STO SE TICE NEXTA MOGU SE PODESAVATI I CUSTOM MODULE ALIASES, `"paths"`, KOJI JE ISTO DEO `"compilerOptions"`

- `code tsconfig.json`

```json
{
  "compilerOptions": {
    // OVO ZNAI DA BASE URL POCINJE U ROOTU PROJECT-A
    "baseUrl": ".",
    "paths": {
      // A ZADAO SAM I ALIASES, ZA NEKE OD FOLDERA
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/styles/*": ["styles/*"],
      "@utils/*": ["utils/*"]
    },

    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

# TREBALO BI DA KONFIGURIRAMO I `ESLINT` JER ON TRENUTNO NE ZNA NISTA O ALIAS-OVIMA I ABSOLUTE IMPORTIMA

- `yarn add --dev eslint-import-resolver-alias`

OVDE MORAMO NA NAPRAVIMO NEKOLIKO PROMENA

***

ZA OVU PRVU NE ZNAM DA LI SI MORAO DA URADIS ALI IPAK SAM URADIO, JER VIDIM VECINU LJUDI DA SU TO URADILI

PROMENIO SAM IME ESLINT CONFIG FILE-A

- `mv .eslintrc.json .eslintrc`

***

- `code .eslintrc`

```json
{
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",

    "plugin:import/warnings",
    "plugin:import/typescript",

    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
    // "prettier/react"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": 1,
    "@typescript-eslint/no-empty-function": 1,
    "@typescript-eslint/no-var-requires": 1,
    "@typescript-eslint/no-inferrable-types": 1,
    "react/prop-types": 0,
    "no-console": 1,
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 1
    // "react/react-in-jsx-scope": 0
  },
  "plugins": [
    "@typescript-eslint",
    "react",
    "import",
    "jsx-a11y",
    "react-hooks"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  // DODAO SAM OVO
  "ignorePatterns": ["node_modules/", ".next/"],
  // 
  "settings": {
    "react": {
      "version": "detect"
    },
    // DODAO SAM OVO
    "import/resolver": {
      "alias": {
        "map": [
          // VIDIS U KAKVOM FORMATU SADA PISES OVO (NE KORISTIS 
          // * I SPRED IDE ./)
          ["@/components", "./components"],
          ["@/lib", "./lib"],
          ["@/styles", "./styles"],
          ["@/util", "./util"]
        ],
        // I MORAO SAM DODATI O KOJIM FILE EKSTENZIJAM SE RADI
        "extensions": [".ts", ".js", ".jsx", ".tsx", ".json"]
      }
    }
  }
}
```

# MOZES SADA DA UPDATE-UJES PATH-OVE KAKO BI KORISTIO ALIASES

POKAZACU TI TO NA OVA DVA PRIMERA

- `code pages/index.tsx`

```tsx
/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent } from "react";
// EVO VIDIS STA SAM URADIO
// UMESTO OVOGA
// import { useAuth } from "../lib/auth";
// OVO
import { useAuth } from "@/lib/auth";

const IndexPage: FunctionComponent = () => {
  const { user, signInWithGitHub, signInWithGoogle, signOut, isLoading } =
    useAuth();

  return user ? (
    <div>
      <p>Email: {user.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  ) : (
    <>
      <button onClick={() => signInWithGitHub()}>Sign In With GitHub</button>
      <button onClick={() => signInWithGoogle(undefined)}>
        Sign In With Google
      </button>
    </>
  );
};

export default IndexPage;

```

- `code lib/db.ts`

```ts
// EVO I OVDE, UMESTO OVOGA
// import firebase from "./firebase";
// OVO
import firebase from "@/lib/firebase";

const firestore = firebase.firestore();

export const updateUser = (uid: string, data: any) => {
  return firestore.collection("users").doc(uid).update(data);
};

export const createUser = (uid: string, data: any) => {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};
```
