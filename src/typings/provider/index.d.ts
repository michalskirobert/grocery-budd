import { NReducer } from "@namespace/reducer";
import React from "react";

export declare namespace NProvider {
  type S = string;
  type N = number;
  type D = Date;
  type B = boolean;
  type JSX = JSX.Element;

  type TProviderProps = {
    Children: JSX;
  };

  type TOptions = {
    label: S;
    value: S;
  };

  type TContextApiProps = {
    logout: () => Promise<void>;
    state: NReducer.TState;
    dispatch: React.Dispatch<NReducer.TAcion>;
  };

  type TRoutes = readonly {
    path: string;
    Children: React.LazyExoticComponent<() => JSX.Element>;
    index?: boolean;
  }[];
}
