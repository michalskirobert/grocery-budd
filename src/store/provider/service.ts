import { useEffect, useState } from "react";
import { NProvider } from "@namespace/index";
import { initialGroceryHelper } from "./utils";
import { getCollection } from "src/firebase";

export const useProviderService = () => {
  const [userData, setUserData] = useState<any>({ isLogged: false });
  const [groceries, setGroceries] =
    useState<Record<string, any>[]>(initialGroceryHelper);

  const [language, setLanguage] = useState<NProvider.TOptions>({
    label: "English",
    value: "ENG",
  });

  const getUserData = async () => {
    const resp = await getCollection("Ur6EhS4Uoydioz0Umsd0uNcOTF42");
    resp.docs.forEach((doc) => console.log(doc.data()));
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
  };
};
