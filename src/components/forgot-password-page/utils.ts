import { NShared } from "@namespace/shared";

import * as C from "@utils/constants";
import * as E from "@utils/enums";

export const FOROGOT_PASSWORD_FORM: NShared.ICustomFormModal["form"] = [
  {
    id: "email",
    label: "E-mail",
    kind: C.INPUT_TYPES.INPUT_EMAIL,
    validations: { isRequired: E.Required.Yes, requiredMessage: "required" },
  },
];
