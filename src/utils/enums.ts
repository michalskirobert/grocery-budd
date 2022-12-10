export const enum UserType {
  Anonymous = 0,
  Logged = 10,
  Vip = 20,
  Fitri = "inifnity",
}

export const enum GroceryStatus {
  Draft = 0,
  Approved = 10,
}

export const enum Required {
  Yes = 10,
  No = 20,
}

export const enum Reducer {
  SET_USER = "SET_USER",
  SET_BOXES = "SET_BOXES",
  SET_LANGUAGE = "SET_LANGUAGE",
  SET_LOADING = "SET_LOADING",
  SET_INITIAL_STATE = "SET_INITIAL_STATE",
  SET_CONFIG_APP = "SET_CONFIG_APP",
  ADD_NEW_GROCERY = "ADD_NEW_GROCERY",
  DELETE_GROCERY = "DELETE_GROCERY",
  SET_GROCERIES = "SET_GROCERIES",
  CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
}
