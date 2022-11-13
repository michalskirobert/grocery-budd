import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

import { fireAuth } from "./auth";

const app = initializeApp(fireAuth);

const db = getFirestore(app);
export const auth = getAuth(app);

export const getCollection = async (collectionName: string, group: string) =>
  collection(db, collectionName, group);
