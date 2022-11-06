import { NShared } from "@namespace/shared";

import * as C from "@utils/constants";

export const GROCERY_FORM: NShared.ICustomFormModal["form"] = [
  {
    id: C.NAME,
    label: C.NAME,
    kind: C.INPUT_TYPES.INPUT_TEXT,
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
  },
  {
    id: C.PRICE,
    label: C.PRICE,
    kind: C.INPUT_TYPES.INPUT_NUMBER,
  },
];
