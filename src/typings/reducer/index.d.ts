import { DocumentData } from "@firebase/firestore";
import React from "react";
import { NProvider } from "..";

export declare namespace NReducer {
  type S = string;
  type N = number;
  type D = Date;
  type B = boolean;

  type TSetUser = {
    type: S;
    payload?: any;
  };

  type TSetLoading = {
    type: S;
    payload: B;
  };

  type TBox = {
    id: S;
    groceries: [];
    budget: N;
    currency: { label: S; value: S };
    color: S;
    backgroundColor: S;
    title: S;
    budgetValue: N;
  };

  type TUser = { uid: S; boxes: TBox[]; language: S; userType: N; isFitri: B };

  type TState = {
    user: TUser;
    isLoading: B;
    configApp: {
      categories: NProvider.TOptions[];
      shops: NProvider.TOptions[];
      currencies: NProvider.TOptions[];
    };
  };

  type TAcion = TSetUser | TSetLoading;
}
