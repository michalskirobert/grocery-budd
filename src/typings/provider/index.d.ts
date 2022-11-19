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
    groceries: Record<string, any>[];
    setGroceries: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
    language: TOptions;
    setLanguage: React.Dispatch<React.SetStateAction<TOptions>>;
    userData: any & User;
    setUserData: React.Dispatch<any>;
    logout: () => Promise<void>;
    setIsGlobalLoading: (isLoading: B) => void;
    isGlobalLoading: B;
    user: User | null;
    setUser: React.Dispatch<User | null>;
  };

  type TRoutes = readonly {
    path: string;
    Children: React.LazyExoticComponent<() => JSX.Element>;
    index?: boolean;
  }[];
}
