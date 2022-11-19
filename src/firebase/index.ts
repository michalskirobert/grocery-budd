import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

import { fireAuth } from "./auth";

const app = initializeApp(fireAuth);

const db = getFirestore(app);

export const auth = getAuth(app);

export const getCollection = async (collectionName: string, props?: string[]) =>
  await getDocs(collection(db, collectionName, ...(props || [])));

export const addDocument = async (id: string, body: any) =>
  await addDoc(collection(db, id), body);

export const setDocument = async (id: string, body: any) =>
  await setDoc(doc(db, id), body);

export const updateDocument = async (id: string, body: any) =>
  await updateDoc(doc(db, id), body);

export const deleteDocument = async (id: string) =>
  await deleteDoc(doc(db, id));
