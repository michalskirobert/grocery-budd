import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

import { fireAuth } from "./auth";

const app = initializeApp(fireAuth);

const db = getFirestore(app);

export const auth = getAuth(app);

export const getCollection = async (collectionName: string, props?: string[]) =>
  await getDocs(collection(db, collectionName, ...(props || [])));
