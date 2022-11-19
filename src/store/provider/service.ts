import { useEffect, useState } from "react";
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

  const getUserData = async () => {
    if (!user?.uid) return;

    const resp = await getCollection(user.uid);
    resp.docs.forEach(
      (doc) => (
        setUserData({ ...user, ...doc.data() }),
        console.log({ userData: doc.data() })
      )
    );
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
    getUserData(); // eslint-disable-next-line
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
