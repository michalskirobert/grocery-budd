import { NReducer } from "@namespace/reducer";

import * as C from "@utils/constants";

export const initialState: NReducer.TState = {
  user: {
    boxes: [
      {
        id: "",
        groceries: [
          {
            id: "",
            category: { label: "", value: "" },
            isPinned: false,
            name: "",
            shopName: { label: "", value: "" },
            value: 0,
          },
        ],
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

export const temporaryValues: NReducer.TState = {
  user: {
    boxes: [
      {
        id: "1",
        groceries: [
          {
            id: "12",
            category: { label: "wqeqweqw", value: "2" },
            isPinned: true,
            name: "wqewqeqwe",
            shopName: { label: "ewqewqeqw", value: "3" },
            value: 124214,
          },
        ],
        budget: 12412412,
        currency: { label: "eweqw", value: "ee" },
        color: "red",
        backgroundColor: "black",
        budgetValue: 12321321,
        title: "wwww",
      },
    ],
    language: "eng",
    userType: 30,
    isFitri: true,
    uid: "1123",
  },
  isLoading: false,
  configApp: { categories: [], currencies: [], shops: [] },
};

export const reducer = (state: NReducer.TState, action: NReducer.TAcion) => {
  switch (action.type) {
    // case C.SET_INITIAL_STATE:
    //   return initialState;
    // case C.SET_CONFIG_APP:
    //   return {
    //     ...state,
    //     configApp: action.payload,
    //   };
    // case C.SET_USER:
    //   return {
    //     ...state,
    //     user: { ...state.user, ...action.payload },
    //   };
    // case C.SET_BOXES:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       boxes: action.payload,
    //     },
    //   };
    // case C.SET_LANGUAGE:
    //   return {
    //     ...state,
    //     language: action.payload,
    //   };
    // case C.SET_IS_FITRI:
    //   return {
    //     ...state,
    //     isFitri: action.payload,
    //   };

    // case C.ADD_NEW_GROCERY:
    //   const currentBox = state.user.boxes
    //     .find(({ id }) => action.payload.boxId === id)
    //     ?.groceries.concat(action.payload.grocery);

    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       boxes: [...state.user.boxes, currentBox],
    //     },
    //   };

    default:
      return temporaryValues;
  }
};
