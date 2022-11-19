import { useEffect, useState } from "react";
import { NProvider } from "@namespace/index";
import { initialGroceryHelper } from "./utils";
import { auth, getCollection } from "src/firebase";
import { signOut } from "firebase/auth";

import { toast } from "react-toastify";

export const useProviderService = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState<any>({ isLogged: false });
  const [groceries, setGroceries] =
    useState<Record<string, any>[]>(initialGroceryHelper);
  const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(false);

  const [language, setLanguage] = useState<NProvider.TOptions>({
    label: "English",
    value: "ENG",
  });

  const getUserData = async () => {
    const resp = await getCollection(userData);
    resp.docs.forEach((doc) => console.log(doc.data()));
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
    getUserData();
  }, []);

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
