import { NShared } from "src/typings/shared";

import * as C from "src/utils/constants";

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
  },
  {
    id: C.PRICE,
    label: C.PRICE,
    kind: C.INPUT_TYPES.INPUT_NUMBER,
  },
];
