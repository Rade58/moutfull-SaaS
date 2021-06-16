// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { SiteNormalizedDataI } from "@/lib/db-admin";
import { getAllSites } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export type SitesApiDataType = {
  sites?: SiteNormalizedDataI[];
  error?: any;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SitesApiDataType>
) => {
  try {
    const token = (req.headers.token as string) || "";

    const {} = await auth.verifyIdToken(token);
  } catch (error) {}

  const result = await getAllSites();

  if (result.error) {
    return res.status(500).json({ error: result.error });
  }

  res.status(200).json({ sites: result.sites });
};
