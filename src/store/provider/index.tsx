import React from "react";

import { NProvider } from "@namespace/index";
import { useProviderService } from "./service";

export const Context = React.createContext<NProvider.TContextApiProps | null>(
  null
);

export const Provider = ({ Children }: NProvider.TProviderProps) => {
  const { groceries, setGroceries, language, setLanguage } =
    useProviderService();

  return (
    <Context.Provider
      value={{
        groceries,
        setGroceries,
        language,
        setLanguage,
      }}
    >
      {Children}
    </Context.Provider>
  );
};
