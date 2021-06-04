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
