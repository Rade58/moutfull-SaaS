import { db } from "@/lib/firebase-admin";
import { parseISO, compareDesc } from "date-fns";

export interface FeedbackDataI {
  author: string;
  authorId: string;
  siteId: string;
  text: string;
  createdAt: string;
  provider: string;
  status: string;
}

export interface SiteDataI {
  url: string;
  name: string;
  userId: string;
  createdAt: string;
}

export interface FeedbackDocI {
  id: string;
  data: () => FeedbackDataI;
}

export interface SiteDocI {
  id: string;
  data: () => SiteDataI;
}

export interface FeedbackNormalizedDataI extends FeedbackDataI {
  id: FeedbackDocI["id"];
}

export interface SiteNormalizedDataI extends SiteDataI {
  id: SiteDocI["id"];
}

export async function getAllFeedback(siteId?: string) {
  try {
    const snapshot = await db
      .collection("feedback")
      .where("siteId", "==", siteId)
      .get();

    const feedback: FeedbackNormalizedDataI[] = [];

    snapshot.forEach((doc) => {
      const { id, data: d } = doc;

      const data = d() as FeedbackDataI;

      feedback.push({
        id,
        ...data,
      });
    });

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {
  const snapshot = await db.collection("sites").get();

  try {
    const sites: SiteNormalizedDataI[] = [];
    snapshot.forEach((doc) => {
      const { id, data: d } = doc;

      const data = d() as SiteDataI;

      sites.push({ id, ...data });
    });

    return { sites };
  } catch (error) {
    return { error };
  }
}

// SITES FOR ONLY ONE USER
export async function getUserSites(uid: string) {
  const snapshot = await db
    .collection("sites")
    .where("authorId", "==", uid)
    .get();

  const sites: SiteNormalizedDataI[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as SiteDataI;

    sites.push({ id: doc.id, ...data });
  });

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { sites };

  // SORTED BY createdAt
}
