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
