import { NReducer } from "@namespace/reducer";

import * as C from "@utils/constants";

export const initialState: NReducer.TState = {
  user: {
    boxes: [
      {
        id: "",
        budget: 0,
        currency: { label: "", value: "" },
        color: "",
        backgroundColor: "",
        budgetValue: 0,
        title: "",
      },
    ],
    groceries: {
      prop: [
        {
          id: "",
          category: { label: "", value: "" },
          isPinned: false,
          name: "",
          shopName: { label: "", value: "" },
          value: 0,
        },
      ],
    },
    language: { label: "English", value: "eng" },
    userType: 0,
    isFitri: false,
    email: "Sign-in",
    accessToken: null,
    uid: null,
    profilePicture:
      "https://firebasestorage.googleapis.com/v0/b/grocery-budd.appspot.com/o/users%2Fpublic%2FprofilePicture%2Fanonymous.png?alt=media&token=e52c401a-9d48-45e2-bec3-cd7a209db698",
  },
  isLoading: false,
  configApp: { categories: [], currencies: [], shops: [], languages: [] },
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

    case C.ADD_NEW_GROCERY:
      return {
        ...state,
        user: {
          ...state.user,
          groceries: {
            [action?.payload?.boxId]: [
              ...(state.user.groceries[action?.payload?.boxId] || []),
              action.payload?.grocery,
            ],
          },
        },
      };

    case C.DELETE_GROCERY:
      return {
        ...state,
        user: {
          ...state.user,
          groceries: {
            [action.payload.boxId]: state.user.groceries[
              action.payload.boxId
            ].filter(({ id }) => id !== action.payload.groceryId),
          },
        },
      };

    case C.SET_GROCERIES:
      return {
        ...state,
        user: {
          ...state.user,
          groceries: {
            ...state.user.groceries,
            [action.payload?.boxId]: action.payload.groceries,
          },
        },
      };
    case C.CHANGE_LANGUAGE:
      return {
        ...state,
        user: {
          ...state.user,
          language: action.payload,
        },
      };

    default:
      return initialState;
  }
};
