// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { SiteNormalizedDataI } from "@/lib/db-admin";
import { getAllSites, getUserSites } from "@/lib/db-admin";
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

    // AKO DOBIJES uid ONA VREDNOST user.xa JE CORRECT
    // STO ZNACI DA AUTHENTICATED USER ZAIST POSTOJI
    const { uid } = await auth.verifyIdToken(token);
    // TADA MZOES DA UZMES I SVE SITE-OVE ZA USER-A
    const { sites } = await getUserSites(uid);
    res.status(200).json({ sites });
  } catch (error) {
    res.status(500).json({ error });
  }
};
