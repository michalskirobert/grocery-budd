import { NShared } from "@namespace/shared";

import * as C from "@utils/constants";
import * as E from "@utils/enums";

export const GROCERY_FORM: NShared.ICustomFormModal["form"] = [
  {
    id: C.NAME,
    label: C.NAME,
    kind: C.INPUT_TYPES.INPUT_TEXT,
    validations: { isRequired: E.Required.Yes, requiredMessage: "" },
  },
  {
    id: C.CATEGORY,
    label: C.CATEGORY,
    kind: C.INPUT_TYPES.INPUT_SELECT,
    options: [
      { label: "help", value: "me" },
      { label: "ie wiem", value: "right" },
      { label: "true", value: "coś  tam" },
    ],
    validations: { isRequired: E.Required.Yes, requiredMessage: "" },
  },
  {
    id: C.SHOP_NAME,
    label: C.SHOP_NAME_LABEL,
    kind: C.INPUT_TYPES.INPUT_SELECT,
    isPositionAddable: true,
    placeholder: "Choose your shop",
    initialValue: { label: "", value: "" },
    options: [{ label: "Media expert", value: "media expert" }],
    validations: { isRequired: E.Required.No, requiredMessage: "" },
  },
  {
    id: C.VALUE,
    label: C.PRICE,
    kind: C.INPUT_TYPES.INPUT_NUMBER,
    validations: { isRequired: E.Required.Yes, requiredMessage: "" },
  },
  {
    id: C.PIN_UP,
    label: C.PIN_UP_LABEL,
    kind: C.INPUT_TYPES.INPUT_SWITCH,
    initialValue: false,
    validations: { isRequired: E.Required.No, requiredMessage: "" },
  },
];
