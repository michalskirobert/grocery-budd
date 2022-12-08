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

  type TAddGrocery = {
    type: S;
    payload: { groceryId: S; grocery: any };
  };

  type TGrocery = {
    id: S;
    name: S;
    category: NProvider.TOptions;
    shopName: NProvider.TOptions;
    value: N;
    isPinned: B;
  };

  type TBox = {
    id: S;
    budget: N;
    currency: { label: S; value: S };
    color: S;
    backgroundColor: S;
    title: S;
    budgetValue: N;
    randomColor: B;
    lastModifiedDate: Date;
    createdDate: Date;
  };

  type TUser = {
    uid: S | null;
    boxes: TBox[];
    groceries: { [x: string]: TGrocery[] };
    language: NProvider.TOptions;
    userType: N;
    isFitri: B;
    email: S;
    profilePicture?: S;
    accessToken?: S | null;
  };

  type TState = {
    user: TUser;
    isLoading: B;
    configApp: {
      categories: NProvider.TOptions[];
      shops: NProvider.TOptions[];
      currencies: NProvider.TOptions[];
      languages: NProvider.TOptions[];
    };
  };

  type TAcion = TSetUser | TSetLoading | TAddGrocery;
}
