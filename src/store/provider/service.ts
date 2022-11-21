import { useEffect, useId, useState } from "react";
import { NProvider } from "@namespace/index";
import { initialGroceryHelper } from "./utils";
import { auth, getCollection } from "src/firebase";
import { signOut, User } from "firebase/auth";

import { toast } from "react-toastify";

export const useProviderService = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [groceries, setGroceries] =
    useState<Record<string, any>[]>(initialGroceryHelper);
  const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(false);

  const [language, setLanguage] = useState<NProvider.TOptions>({
    label: "English",
    value: "ENG",
  });

  console.log({ userData });

  const getInitApp = async () => {
    if (!user?.uid) return;

    let boxes: any[] = [];
    let userData: any = {};

    const resp = await getCollection(user.uid);
    const data = await getCollection(`${user.uid}/data/budgets`);

    resp.docs.forEach((doc) => (userData = doc.data()));

    data.docs.forEach((doc) => boxes.push({ id: doc.id, ...doc.data() }));

    setUserData({ ...userData, boxes });
  };

  const logout = async () => {
    try {
      setIsGlobalLoading(true);
      await signOut(auth);
      setUser(null);
      setUserData(null);
      setIsGlobalLoading(false);
    } catch (error) {
      setIsGlobalLoading(false);
      toast.error("Nie można wylogować użytkownika");
    }
  };

  useEffect(() => {
    getInitApp(); // eslint-disable-next-line
  }, [user?.uid]);

  return {
    groceries,
    setGroceries,
    language,
    setLanguage,
    userData,
    setUserData,
    logout,
    isGlobalLoading,
    setIsGlobalLoading,
    user,
    setUser,
  };
};
