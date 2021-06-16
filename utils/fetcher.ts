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
