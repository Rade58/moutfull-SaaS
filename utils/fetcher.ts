export default async function (url: RequestInfo, init?: RequestInit) {
  // OVDE SAM MOGAO KORISTITI I axios UMESTO fetch

  const res = await fetch(url, init);

  // json FUNKCIJA PARSE-UJE JSON STRING INTO VALID JAVASCRIPT
  return res.json();
}
