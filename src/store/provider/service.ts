import { useState } from "react";
import { NProvider } from "src/typings";
import { initialGroceryHelper } from "./utils";

export const useProviderService = () => {
  const [groceries, setGroceries] =
    useState<Record<string, any>[]>(initialGroceryHelper);

  const [language, setLanguage] = useState<NProvider.TLanguage>({
    label: "English",
    value: "ENG",
  });

  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

  return {
    groceries,
    setGroceries,
    language,
    setLanguage,
    isFormModalOpen,
    setIsFormModalOpen,
  };
};
