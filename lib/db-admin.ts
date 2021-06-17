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
  route: string;
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

export async function getAllFeedback(siteId?: string, route?: string) {
  try {
    let ref = db
      .collection("feedback")
      .where("siteId", "==", siteId)
      .where("status", "==", "active");

    if (route) {
      ref = ref.where("route", "==", route);
    }

    const snapshot = await ref.get();

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
    console.error(error);
    return { feedback: [] };
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
    console.error(error);
    return { sites: [] };
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
