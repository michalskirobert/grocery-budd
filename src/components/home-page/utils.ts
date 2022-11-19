import { NShared } from "@namespace/shared";

import * as C from "@utils/constants";
import * as E from "@utils/enums";

export const FORM: NShared.ICustomFormModal["form"] = [
  {
    id: C.TITLE,
    kind: C.INPUT_TYPES.INPUT_TEXT,
    label: C.NAME,
    validations: { isRequired: E.Required.No, requiredMessage: "" },
  },
  {
    id: C.BUDGET,
    kind: C.INPUT_TYPES.INPUT_NUMBER,
    label: C.BUDGET,
    validations: { isRequired: E.Required.No, requiredMessage: "" },
  },
  {
    id: C.COLOR,
    kind: C.INPUT_TYPES.INPUT_TEXT,
    label: C.COLOR,
    validations: { isRequired: E.Required.No, requiredMessage: "" },
  },
  {
    id: C.CURRENCY,
    kind: C.INPUT_TYPES.INPUT_SELECT,
    label: C.CURRENCY,
    options: [{ label: "euro", value: "€" }],
    validations: { isRequired: E.Required.No, requiredMessage: "" },
  },
];
