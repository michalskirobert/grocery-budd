import { NReducer } from "@namespace/reducer";
import { NShared } from "@namespace/shared";

import * as C from "@utils/constants";
import * as E from "@utils/enums";

export const setGroceryForm = (
  configApp?: NReducer.TState["configApp"]
): NShared.ICustomFormModal["form"] => [
  {
    id: C.NAME,
    label: C.NAME,
    kind: C.INPUT_TYPES.INPUT_TEXT,
    validations: { isRequired: E.Required.Yes, requiredMessage: "required" },
  },
  {
    id: C.CATEGORY,
    label: C.CATEGORY,
    kind: C.INPUT_TYPES.INPUT_SELECT,
    options: configApp?.categories,
    validations: { isRequired: E.Required.Yes, requiredMessage: "required" },
  },
  {
    id: C.SHOP_NAME,
    label: C.SHOP_NAME_LABEL,
    kind: C.INPUT_TYPES.INPUT_SELECT,
    isPositionAddable: true,
    placeholder: "Choose your shop",
    initialValue: { label: "", value: "" },
    options: configApp?.shops,
    validations: { isRequired: E.Required.No, requiredMessage: "" },
  },
  {
    id: C.PIECES,
    label: C.PIECES,
    kind: C.INPUT_TYPES.INPUT_NUMBER,
    validations: { isRequired: E.Required.Yes, requiredMessage: "required" },
    initialValue: 0,
  },
  {
    id: C.VALUE,
    label: C.PRICE,
    kind: C.INPUT_TYPES.INPUT_NUMBER,
    validations: {
      isRequired: E.Required.Yes,
      requiredMessage: "required",
      min: 0,
      minMessage: "Cannot be less than 0",
    },
  },
  {
    id: C.PIN_UP,
    label: "",
    internalLabel: C.PIN_UP_LABEL,
    kind: C.INPUT_TYPES.INPUT_SWITCH,
    initialValue: false,
    validations: { isRequired: E.Required.No, requiredMessage: "" },
  },
];

export const GROCERY_COLORS = [
  "purple",
  "yellow",
  "blue",
  "green",
  "brown",
  "orange",
];

export const FILTERS_HELPER = {
  SEARCH: "search",
  PIN: "pin",
  NAME: "name",
  DATE: "date",
  PRICE: "price",
  SHOP: "shop",
};
