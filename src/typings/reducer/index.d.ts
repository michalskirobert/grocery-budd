import React from "react";

import { DocumentData } from "@firebase/firestore";
import { NProvider } from "..";

import * as E from "@utils/enums";

export declare namespace NReducer {
  type S = string;
  type N = number;
  type D = Date;
  type B = boolean;

  type TGrocery = {
    id: S;
    name: S;
    category: NProvider.TOptions;
    shopName: NProvider.TOptions;
    value: N;
    pieces: N;
    isPinned: B;
    color: S;
    calculatedValue: N;
    lastModifiedDate: S;
    createdDate: S;
  };

  type TBox = {
    id: S;
    budget: N;
    currency?: { label: S; value: S };
    color: S;
    backgroundColor: S;
    title: S;
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

  type TConfig = {
    categories: NProvider.TOptions[];
    shops: NProvider.TOptions[];
    currencies: NProvider.TOptions[];
    languages: NProvider.TOptions[];
  };

  type TState = {
    user: TUser;
    isLoading: B;
    configApp: TConfig;
  };

  //Actions

  type TSetUser = {
    type: E.Reducer.SET_USER;
    payload?: TUser;
  };

  type TSetLoading = {
    type: E.Reducer.SET_LOADING;
    payload: B;
  };

  type TAddGrocery = {
    type: E.Reducer.ADD_NEW_GROCERY;
    payload: { boxId?: S; grocery: NReducer.TGrocery };
  };

  type TSetBoxes = {
    type: E.Reducer.SET_BOXES;
    payload: NReducer.TBox[];
  };

  type TSetInitialState = {
    type: E.Reducer.SET_INITIAL_STATE;
  };

  type TSetConfig = {
    type: E.Reducer.SET_CONFIG_APP;
    payload: TConfig;
  };

  type TDeleteGrocery = {
    type: E.Reducer.DELETE_GROCERY;
    payload: { boxId: S; groceryId: S };
  };

  type TSetGroceries = {
    type: E.Reducer.SET_GROCERIES;
    payload: { groceries: TGrocery[]; boxId: S };
  };

  type TSetLanguage = {
    type: E.Reducer.CHANGE_LANGUAGE;
    payload: NProvider.TOptions;
  };

  type TAcion =
    | TSetUser
    | TSetLoading
    | TAddGrocery
    | TSetBoxes
    | TSetLoading
    | TSetInitialState
    | TAddGrocery
    | TSetConfig
    | TDeleteGrocery
    | TSetLanguage
    | TSetGroceries;
}
