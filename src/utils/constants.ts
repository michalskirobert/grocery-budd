import { NShared } from "@namespace/shared";

//INPUTS
export const INPUT_TYPES: Record<string, NShared.TFormKinds> = {
  INPUT_TEXT: "input-text",
  INPUT_CHECKBOX: "input-checkbox",
  INPUT_NUMBER: "input-number",
  INPUT_SELECT: "input-select",
  INPUT_PASSWORD: "input-password",
  INPUT_EMAIL: "input-email",
};

export const INPUT_TEXT_TYPE = "text";
export const INPUT_NUMBER_TYPE = "number";

// GROCERY FORM FIELDS
export const CATEGORY = "category";
export const PRICE = "price";
export const AGE = "age";
export const NAME = "name";

//GROCERY
export const GROCERY_MODAL_TITLE = "New Grocery";

//Homepage
export const CURRENCY = "currency";
export const BUDGET = "budget";
export const COLOR = "color";

//Reducer
export const SET_USER = "SET_USER";
