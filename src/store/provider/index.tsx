import React from "react";

import { NProvider } from "@namespace/index";
import { useProviderService } from "./service";

export const Context = React.createContext<NProvider.TContextApiProps | null>(
  null
);

export const Provider = ({ Children }: NProvider.TProviderProps) => {
  const { logout, dispatch, state } = useProviderService();

  return (
    <Context.Provider
      value={{
        logout,
        dispatch,
        state,
      }}
    >
      {Children}
    </Context.Provider>
  );
};
