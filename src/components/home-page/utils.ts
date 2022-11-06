import { NShared } from "@namespace/shared";

import * as C from "@utils/constants";

export const Form: NShared.ICustomFormModal["form"] = [
  { id: C.NAME, kind: C.INPUT_TYPES.INPUT_TEXT, label: C.NAME },
  {
    id: C.CURRENCY,
    kind: C.INPUT_TYPES.INPUT_SELECT,
    label: C.CURRENCY,
    options: [{ label: "euro", value: "euro" }],
  },
];
