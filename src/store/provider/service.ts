import { useEffect, useState } from "react";
import { NProvider } from "@namespace/index";
import { initialGroceryHelper } from "./utils";
import { auth, getCollection } from "src/firebase";
import { signOut } from "firebase/auth";

import { toast } from "react-toastify";

export const useProviderService = () => {
  const [userData, setUserData] = useState<any>({ isLogged: false });
  const [groceries, setGroceries] =
    useState<Record<string, any>[]>(initialGroceryHelper);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [language, setLanguage] = useState<NProvider.TOptions>({
    label: "English",
    value: "ENG",
  });

  const getUserData = async () => {
    const resp = await getCollection("Ur6EhS4Uoydioz0Umsd0uNcOTF42");
    resp.docs.forEach((doc) => console.log(doc.data()));
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
  };
};
