import { NProvider } from "@namespace/provider";
import { NReducer } from "@namespace/reducer";

import * as E from "@utils/enums";

export const setUser = (payload: NReducer.TUser): NReducer.TSetUser => ({
  type: E.Reducer.SET_USER,
  payload,
});

export const setBoxes = (payload: NReducer.TBox[]): NReducer.TSetBoxes => ({
  type: E.Reducer.SET_BOXES,
  payload,
});

export const setIsLoading = (payload: boolean): NReducer.TSetLoading => ({
  type: E.Reducer.SET_LOADING,
  payload,
});

export const setInitialState = (): NReducer.TSetInitialState => ({
  type: E.Reducer.SET_INITIAL_STATE,
});

export const setConfigApp = (
  payload: NReducer.TConfig
): NReducer.TSetConfig => ({
  type: E.Reducer.SET_CONFIG_APP,
  payload,
});

export const addNewGrocery = (
  grocery: NReducer.TGrocery,
  boxId?: string
): NReducer.TAddGrocery => ({
  type: E.Reducer.ADD_NEW_GROCERY,
  payload: { boxId, grocery },
});

export const deleteGrocery = (
  boxId: string,
  groceryId: string
): NReducer.TDeleteGrocery => ({
  type: E.Reducer.DELETE_GROCERY,
  payload: { boxId, groceryId },
});

export const setGroceries = (
  groceries: NReducer.TGrocery[],
  boxId: string
): NReducer.TSetGroceries => ({
  type: E.Reducer.SET_GROCERIES,
  payload: { groceries, boxId },
});

export const setLanguage = (
  payload: NProvider.TOptions
): NReducer.TSetLanguage => ({
  type: E.Reducer.CHANGE_LANGUAGE,
  payload,
});
