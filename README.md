# SWR (Client-Side RENDERING)

- `yarn add swr`

ODAVDE MOZES POCETI DA [UCIS O swr](https://docs.react2025.com/dashboard/swr)

>> SWR is a React Hooks library for remote data fetching. SWR first returns the data from cache (stale), then sends the fetch request (revalidate), and finally comes with the up-to-date data again.

>> This is important for our dashboard page because it can be left open and the data will remain fresh. If you re-focus or switch between tabs, SWR will automatically revalidate data.

MADA MOZES DA SAZNAS I [SA ZVANICNE DOCS STRANICE](https://swr.vercel.app/#focus-revalidation)


## KREIRACEMO PRVO `fetcher` FUNKCIJU, KOJA TREBA DA PARSE-UJE DATA IZ RESPONSE-A; ALI ONA CE MORATI DA KORISTI `window.fetch`

- `mkdi utils`

- `touch utils/fetcher.ts`

```ts
export default async function (url: RequestInfo, init?: RequestInit) {
  // OVDE SAM MOGAO KORISTITI I axios UMESTO fetch

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
