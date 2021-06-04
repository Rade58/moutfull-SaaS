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
