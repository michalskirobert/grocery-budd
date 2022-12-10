import { NReducer } from "@namespace/reducer";

import * as E from "@utils/enums";

export const initialState: NReducer.TState = {
  user: {
    boxes: [
      {
        id: "",
        budget: 0,
        currency: { label: "", value: "" },
        color: "",
        backgroundColor: "",
        title: "",
        randomColor: false,
        createdDate: new Date(),
        lastModifiedDate: new Date(),
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
          pieces: 0,
          color: "yellow",
          calculatedValue: 0,
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

export const reducer = (
  state: NReducer.TState,
  action: NReducer.TAcion
): NReducer.TState => {
  switch (action.type) {
    case E.Reducer.SET_INITIAL_STATE:
      return initialState;
    case E.Reducer.SET_CONFIG_APP:
      return {
        ...state,
        configApp: action.payload,
      };
    case E.Reducer.SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case E.Reducer.SET_BOXES:
      return {
        ...state,
        user: {
          ...state.user,
          boxes: action.payload,
        },
      };
    case E.Reducer.ADD_NEW_GROCERY:
      return {
        ...state,
        user: {
          ...state.user,
          groceries: {
            [String(action?.payload?.boxId)]: [
              ...(state.user.groceries[String(action?.payload?.boxId)] || []),
              action.payload?.grocery,
            ],
          },
        },
      };

    case E.Reducer.DELETE_GROCERY:
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

    case E.Reducer.SET_GROCERIES:
      return {
        ...state,
        user: {
          ...state.user,
          groceries: {
            ...state.user.groceries,
            [String(action.payload?.boxId)]: action.payload?.groceries,
          },
        },
      };
    case E.Reducer.CHANGE_LANGUAGE:
      return {
        ...state,
        user: {
          ...state.user,
          language: action.payload,
        },
      };

    case E.Reducer.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return initialState;
  }
};
