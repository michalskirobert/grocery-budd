import { NProvider } from "@namespace/provider";
import { Context } from "@store/provider";
import { useContext } from "react";

export const useHeaderService = () => {
  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const { state, dispatch, logout } = props || {};

  return { ...state };
};
