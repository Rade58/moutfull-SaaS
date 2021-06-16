# SWR (Client-Side RENDERING)

- `yarn add swr`

ODAVDE MOZES POCETI DA [UCIS O swr](https://docs.react2025.com/dashboard/swr)

>> SWR is a React Hooks library for remote data fetching. SWR first returns the data from cache (stale), then sends the fetch request (revalidate), and finally comes with the up-to-date data again.

>> This is important for our dashboard page because it can be left open and the data will remain fresh. If you re-focus or switch between tabs, SWR will automatically revalidate data.

MADA MOZES DA SAZNAS I [SA ZVANICNE DOCS STRANICE](https://swr.vercel.app/#focus-revalidation)


## KREIRACEMO PRVO `fetcher` FUNKCIJU, KOJA TREBA DA PARSE-UJE DATA IZ RESPONSE-A; ALI ONA CE MORATI DA KORISTI `window.fetch`

- `mkdir utils`

- `touch utils/fetcher.ts`

```ts
export default async function (url: RequestInfo, init?: RequestInit) {
  // OVDE SAM MOGAO KORISTITI I axios UMESTO fetch

  // A OVO ZNACI DA BI TI ISTO PROSLEDJIVAO I BODY I HEADERS
  // UPRAVO OVDE

  const res = await fetch(url, init);

  // json FUNKCIJA PARSE-UJE JSON STRING INTO VALID JAVASCRIPT
  return res.json();
}

```

OVAJ `fetcher` CALLBACJK CE SE UPOTREBLJAVATI, KAO ONO STO CE SLATI ACTUAL REQUEST, I STO CE RETIRN-OVATI DATA U FORMATU VALID JAVASCRIPT-A

EVO VIDI

```ts
// data CE BITI ONO STO RETURN-UJE FETCHER
const {data, error} = useSWR("/api/some_route", fetcher)
```

# KORISTICEMO `useSwr` NA NOVOM PAGE-U `pages/sites.tsx`

```tsx
/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC } from "react";
import type { SitesApiDataType } from "./api/sites";
// EVO UVEZAO SAM GA
import useSWR from "swr";

import DasboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import SiteTable from "@/components/SiteTable";

import fetcher from "@/utils/fetcher";

const Dashboard: FC = () => {
  // CAK SAM DODAO I TYPESCRIPT TYPE O TOME KAKO TREBA DA IZGLEDA DATA
  const { data } = useSWR<SitesApiDataType>("/api/sites", fetcher);

  const sites = data?.sites;

  if (!data || !sites) {
    return (
      <DasboardShell>
        <SiteTableSkeleton />
      </DasboardShell>
    );
  }

  return (
    <DasboardShell>
      {sites.length ? <SiteTable sites={sites} /> : <EmptyState />}
    </DasboardShell>
  );
};

export default Dashboard;
```

# MEDJUTIM, PRVI ARGUMENT `useSwr` USTVARI JESU ARGUMENT, KOJI SE PROSLEDJUJU FETCH-ERU

POKAZACU TI TOO NA PRIMERU, KAKO BI TI BILO JASNIJE

POSTO CEMO MI KORISTITI `xa` SA USER OBJECT-A, A TO BI TREBALO DA JE JSON WEB TOKEN, POKAZACU TI KAKO MOZEMO PROSLEDITI ARGUGUMENTS IN ARRAY

PRVO DA MODIFIKUJEMO FETCH-ERA DA ON UZIMA U OBZIR, USTVARI TAJ TOKEN

- `code utils/fetcher.ts`

```ts
// TOKEN CE BITI DRUGI ARGUMENT fetcher-A

export default async function fetcher(url: RequestInfo, token: string) {
  // POSLACEMO CUSTOM HEADER, KOJ ICE SE ZVATI token

  const headers = new Headers({ "Content-Type": "application/json", token });

  const res = await fetch(url, {
    method: "GET",
    headers,
    credentials: "same-origin",
  });

  return res.json();
}
```

**SADA MOZEMO NA SLEDECI NACIN DA KORISTIMO, `fetcher`-A, SA `useSWR`**

- `code pages/sites.tsx`

```tsx
/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC } from "react";
import type { SitesApiDataType } from "./api/sites";
// EVO UVEZAO SAM GA
import useSWR from "swr";

import DasboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import SiteTable from "@/components/SiteTable";

import fetcher from "@/utils/fetcher";

// POSTO MOZEMO UZETI user OBJECT IZ useAuth HOOK-A, NJEGA SMO UVEZLI
import { useAuth } from "@/lib/auth";

const Dashboard: FC = () => {
  // UZIMAMO user-A
  const { user } = useAuth();

  // OVDE, PRVI ARGUMENT JE ARRAY fetcher-OVIH ARGUMENATA (ODNONO
  // ARGUMENATA NAMENJENIH fetcher FUNKCIJI, KOJA JE ONA, KOAJ ACTUALY SALJE REQUEST)
  // I OVOG PUTA token JE U ARGUMENTS ARRAY, PORED URL-A
  const { data } = useSWR<SitesApiDataType>(
    user ? ["/api/sites", user.token] : null,
    fetcher
  );

  // NEKA TE NE BUNI GORNJI TERNARY, UPOTREBIO
  // SAM GA ZA SLUCAJ DA NEMA user OBJECT-A
  // U TOM SLUCAJU REQUEST NECE BITI NI POSLAT

  const sites = data?.sites;

  if (!data || !sites) {
    return (
      <DasboardShell>
        <SiteTableSkeleton />
      </DasboardShell>
    );
  }

  return (
    <DasboardShell>
      {sites.length ? <SiteTable sites={sites} /> : <EmptyState />}
    </DasboardShell>
  );
};

export default Dashboard;
```

# MUTATION (`OPTIMIISTIC UI`)

MI CEMO USTVARI MUTATE-OVATI CACHE, REQUEST-A, KOJI JE NAPRAVLJEN KORISCENJEM NEKOG useSWR

[MALO VISE O OVOME MOZES PROCITATI OVDE](https://swr.vercel.app/docs/mutation)

AKO KORISTIS `mutate` FROM `'swr'` PACKAGE; **TO CE ZNACITI DA `useSwr` KOJI CE BITI MATCHED PO PRVOM SVOM ARGUMENTU, KOJI SI MU RANIJE DAO, CE UPDATE-OVATI SVOJ CACHE, DODAVAJUCI OLD VALUE-U, NOVI VLUE, KOJ ICES TI PROVIDE-OVATI, TAKO STO CES POZVATI `mutate` FUNKCIU**

NA TAJ NACIN DOBICES LATEST DATA, A NECE BITI NAPRAVLJEN NOVI NETWORK REQUEST

ZA CACHE BITAN JE KLJUC, A TO JE PRVI ARGUMENT SA KOJIM JE POZVAN `useSwr`

TAJ **PRVI ARGUMENT JESTE, ODNONO JESU ARGUMENTI, SA KOJIMA SE POZIVA fetcher** 

A ZNAS DA TO MOZE BITI I NIZ ARGUMENATA, STOO ZNACI DA KLJUC MOZE BITI I ARRAY

STO CE U MOM PRIMERU I BITI, DAKLE KLJUC CE BITI ARRAY

JOS JEDNA ODLIKA, OVOGA JE [REVALIDATION](https://swr.vercel.app/docs/revalidation) (TI PROCITAJ U SVOJE SLOBODNO VREME STA JE REVALIDATION), U OVOM SLUCAJU JA CU REVALIDATION PODESITI NA false

- `code components/AddSiteModal.tsx`

```tsx
/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC } from "react";

// TREBAC MI POMENUTI mutate
import { mutate } from "swr";

import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  // KORISTI SE ZA STATE MODALA (LAKSI JE HANDLING STATE-A)
  useDisclosure,

  //
  useToast,
} from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";

import { createSite } from "@/lib/db";

const AddSiteModal: FC = ({ children }) => {
  const { user } = useAuth();

  // STATE MODALA
  // FUNKCIJE onClose I onOpen USTVARI PODESVAJU isOpen
  // TO BE true OR false
  const { isOpen, onClose, onOpen } = useDisclosure();

  const toast = useToast();

  // OVO IZGLEDA DA DAJE FUNCTIONALITY OUT OF THE BOX
  // handlesubmit je ZA ONO STA I GOVORI
  // (ALI OBEZBEDJIVACEMIU SE FUNKCIJA KOJU ZELIM, KAO ARGUMENT)
  // A register JE ZA REFERENCU FORM CONTROLE
  // ODNON OZA MULTIPLE CONTROLA
  const { register, handleSubmit } = useForm();

  const onCreateSite = (params: { name: string; url: string }) => {
    if (!user) return;

    const { name, url } = params;

    const newSite = {
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    };

    // OVDE JE NAPRAVLJEN NETWORK REQUEST
    const { id } = createSite(newSite);
    // UNDER THE HOOD OVA FUNKCIJA NE AWAIT-UJE DA SE NETWORK REQUEST
    // IZVRSI, ONA SALJE DATA, SA KOJIMA SE PRAVI NOVI SITE

    toast({
      title: "Success!",
      description: "We've added your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // OVDE NECE BITI NAPRAVLJEN NOVI NETWORK REQUEST
    // KORISTIM OVDE mutate, KAKO BI RAKO SVIM
    // useSwr-OVIMA, KOJI KORISTE KLJUC:
    //                ["/api/sites",  "user-ov jwt token"]
    // DRUGI ARGUMENT mutate-A JE FUNKCIJA, KOJOM CEMO MUTATE-OVATI CACHE
    mutate(
      ["/api/sites", user.token],
      async (oldCachedData: { sites: any[] }) => {
        // OBICNO DATA RESPONSE, JE U FORMATU {sites: ...}
        return {
          sites: [{ id, ...newSite }, ...oldCachedData.sites],
        };
      },
      // REVALIDATIO NCE BITI false
      false
    );

    // GOVORIM ODA SE MODAL ZATVORI
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{ bg: "gray.800", transform: "scale(0.95)" }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {/* OVDE POZIVAMO onCreateSite */}
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My site"
                name="name"
                // REGISTRUJEMO FIELD DA BISMO MOGLI DA ACCESS-UJEMO VALUE
                ref={register("name", { required: true }).ref}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
```


