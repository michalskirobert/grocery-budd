import { useState } from "react";
import { NProvider } from "@namespace/index";
import { initialGroceryHelper } from "./utils";

export const useProviderService = () => {
  const [groceries, setGroceries] =
    useState<Record<string, any>[]>(initialGroceryHelper);

  const [language, setLanguage] = useState<NProvider.TLanguage>({
    label: "English",
    value: "ENG",
  });

  return {
    groceries,
    setGroceries,
    language,
    setLanguage,
  };
};
