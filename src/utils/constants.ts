import { NShared } from "@namespace/shared";

//INPUTS
export const INPUT_TYPES: Record<string, NShared.TFormKinds> = {
  INPUT_TEXT: "input-text",
  INPUT_CHECKBOX: "input-checkbox",
  INPUT_NUMBER: "input-number",
  INPUT_SELECT: "input-select",
  INPUT_PASSWORD: "input-password",
  INPUT_EMAIL: "input-email",
  INPUT_COLOR: "input-color",
  INPUT_SWITCH: "input-switch",
  INPUT_RADIO_BUTTON: "input-radio-button",
  INPUT_MULTIPLE_CHECKBOXES: "input-multiple-checkboxes",
  INPUT_SINGLE_CHECKBOX: "input-single-checkbox",
  INPUT_GROUP_FIELDS: "input-group-fields",
};

export const INPUT_TEXT_TYPE = "text";
export const INPUT_NUMBER_TYPE = "number";

// GROCERY FORM FIELDS
export const CATEGORY = "category";
export const SHOP_NAME_LABEL = "Shop name";
export const SHOP_NAME = "shopName";
export const PRICE = "Price";
export const VALUE = "value";
export const PIN_UP_LABEL = "Pin";
export const PIN_UP = "isPinned";
export const AGE = "age";
export const NAME = "name";
export const TITLE = "title";

//GROCERY
export const GROCERY_MODAL_TITLE = "New Grocery";

//Homepage
export const CURRENCY = "currency";
export const BUDGET = "budget";
export const BACKGROUND_COLOR = "background color";
export const BACKGROUND_COLOR_PROP = "backgroundColor";
export const COLOR = "color";
export const RANDOM_COLOR_LABEL = "Random color";
export const RANDOM_COLOR = "randomColor";

//Reducer
export const SET_USER = "SET_USER";
export const SET_BOXES = "SET_BOXES";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_IS_FITRI = "SET_IS_FITRI";
export const SET_LOADING = "SET_LOADING";
export const SET_INITIAL_STATE = "SET_INITIAL_STATE";
export const SET_CONFIG_APP = "SET_CONFIG_APP";
export const ADD_NEW_GROCERY = "ADD_NEW_GROCERY";
export const DELETE_GROCERY = "DELETE_GROCERY";
export const SET_GROCERIES = "SET_GROCERIES";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

//COLORS

export const COLOR_BASE = {
  BLUE: "#25CED1",
  PINK: "#FF70A6",
  SALMON: "#FF9770",
  ORNAGE: "#FFD670",
  YELLOW: "#E9FF70",
  GREY: "#4B4B4B",
  ERROR: "#dc3545",
  BLACK: "#11111",
  WHITE: "#F1111",
};
