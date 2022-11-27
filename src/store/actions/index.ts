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
  groceryId?: NReducer.TAddGrocery["payload"]["groceryId"]
) => ({
  type: C.ADD_NEW_GROCERY,
  payload: { boxId: groceryId, grocery },
});
