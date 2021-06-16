import firebase from "@/lib/firebase";
import type { FeedbackDataI } from "@/lib/db-admin";

const firestore = firebase.firestore();

export const updateUser = (uid: string, data: any) => {
  return firestore.collection("users").doc(uid).update(data);
};

export const createUser = (uid: string, data: any) => {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};

// CREATE FEEDBACK

export const createFeedback = (data: FeedbackDataI) => {
  return firestore.collection("feedback").add(data);
};

// SAVE SITE

export function createSite(data: { name: string; url: string }) {
  const site = firestore.collection("sites").doc();
  site.set(data);

  return site;
}

// DELETE FEEDBACK

export function deleteFeedback(id: string) {
  return firestore.collection("feedback").doc(id).delete();
}

// DELETE SITE
export function deleteSite(id: string) {
  return firestore.collection("sites").doc(id).delete();
}
