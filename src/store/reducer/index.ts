import { NReducer } from "@namespace/reducer";

import * as C from "@utils/constants";

export const initialState: NReducer.TState = {
  user: {
    boxes: [
      {
        id: "",
        groceries: [],
        budget: 0,
        currency: { label: "", value: "" },
        color: "",
        backgroundColor: "",
        budgetValue: 0,
        title: "",
      },
    ],
    language: "eng",
    userType: 0,
    isFitri: false,
    uid: "",
  },
  isLoading: false,
  configApp: { categories: [], currencies: [], shops: [] },
};

export const reducer = (state: NReducer.TState, action: NReducer.TAcion) => {
  switch (action.type) {
    case C.SET_INITIAL_STATE:
      return initialState;
    case C.SET_CONFIG_APP:
      return {
        ...state,
        configApp: action.payload,
      };
    case C.SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case C.SET_BOXES:
      return {
        ...state,
        user: {
          ...state.user,
          boxes: action.payload,
        },
      };
    case C.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case C.SET_IS_FITRI:
      return {
        ...state,
        isFitri: action.payload,
      };
  }
};
