import { NShared } from "@namespace/shared";

import * as E from "@utils/enums";

export const FORM: NShared.TForm[] = [
  {
    id: "email",
    kind: "input-email",
    label: "E-mail",
    validations: { isRequired: E.Required.Yes, requiredMessage: "Required" },
  },
  {
    id: "password",
    kind: "input-password",
    label: "Password",
    validations: {
      isRequired: E.Required.Yes,
      requiredMessage: "Required",
      min: 5,
    },
  },
];
