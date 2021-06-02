import db from "@/lib/firebase-admin";

export interface FeedbackDataI {
  author: string;
  authorId: string;
  siteId: string;
  text: string;
  createdAt: string;
  provider: string;
  status: string;
}

export interface FeedbackDocI {
  id: string;
  data: () => FeedbackDataI;
}

export interface FeedbackNormalizedDataI extends FeedbackDataI {
  id: FeedbackDocI["id"];
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

  const sites: any[] = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}
