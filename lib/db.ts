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
