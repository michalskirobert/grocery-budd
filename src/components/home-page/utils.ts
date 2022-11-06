import { NShared } from "@namespace/shared";

import * as C from "@utils/constants";

export const FORM: NShared.ICustomFormModal["form"] = [
  { id: C.NAME, kind: C.INPUT_TYPES.INPUT_TEXT, label: C.NAME },
  { id: C.BUDGET, kind: C.INPUT_TYPES.INPUT_NUMBER, label: C.BUDGET },
  { id: C.COLOR, kind: C.INPUT_TYPES.INPUT_TEXT, label: C.COLOR },
  {
    id: C.CURRENCY,
    kind: C.INPUT_TYPES.INPUT_SELECT,
    label: C.CURRENCY,
    options: [{ label: "euro", value: "€" }],
  },
];
