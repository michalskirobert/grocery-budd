import { NProvider } from "@namespace/provider";
import { NReducer } from "@namespace/reducer";

import * as C from "@utils/constants";

export const setUser = (payload: NReducer.TSetUser["payload"]) => ({
  type: C.SET_USER,
  payload,
});

export const setBoxes = (payload: NReducer.TSetUser["payload"]) => ({
  type: C.SET_BOXES,
  payload,
});

export const setIsLoading = (payload: NReducer.TSetLoading["payload"]) => ({
  type: C.SET_LOADING,
  payload,
});

export const setInitialState = () => ({
  type: C.SET_INITIAL_STATE,
});

export const setConfigApp = (payload: any) => ({
  type: C.SET_CONFIG_APP,
  payload,
});

export const addNewGrocery = (
  grocery: NReducer.TAddGrocery["payload"]["grocery"],
  boxId?: NReducer.TAddGrocery["payload"]["groceryId"]
) => ({
  type: C.ADD_NEW_GROCERY,
  payload: { boxId, grocery },
});

export const deleteGrocery = (boxId: string, groceryId: string) => ({
  type: C.DELETE_GROCERY,
  payload: { boxId, groceryId },
});

export const setGroceries = (groceries: any, boxId: string) => ({
  type: C.SET_GROCERIES,
  payload: { groceries, boxId },
});

export const setLanguage = (payload: NProvider.TOptions) => ({
  type: C.CHANGE_LANGUAGE,
  payload,
});
