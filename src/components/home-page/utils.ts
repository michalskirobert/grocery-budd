import { checkIsValid } from "@helpers/useful-functions";
import { NReducer } from "@namespace/reducer";
import { NShared } from "@namespace/shared";

import * as C from "@utils/constants";
import * as E from "@utils/enums";

export const setForm = (
  configApp?: NReducer.TState["configApp"]
): NShared.ICustomFormModal["form"] => [
  {
    id: C.TITLE,
    kind: C.INPUT_TYPES.INPUT_TEXT,
    label: C.NAME,
    validations: {
      isRequired: E.Required.Yes,
      requiredMessage: "Pole jest wymagane",
    },
  },
  {
    id: C.BUDGET,
    kind: C.INPUT_TYPES.INPUT_NUMBER,
    label: C.BUDGET,
    validations: {
      isRequired: E.Required.Yes,
      requiredMessage: "Pole jest wymagane",
      min: 1,
      minMessage: "at least 1",
      max: 99999999,
      maxMessage: "It cannot be more than 9999999",
    },
  },
  {
    id: C.RANDOM_COLOR,
    kind: C.INPUT_TYPES.INPUT_SINGLE_CHECKBOX,
    label: "",
    internalLabel: C.RANDOM_COLOR_LABEL,
    validations: { isRequired: E.Required.No, requiredMessage: "" },
    check: true,
    inline: true,
  },
  {
    id: C.BACKGROUND_COLOR_PROP,
    kind: C.INPUT_TYPES.INPUT_COLOR,
    label: C.BACKGROUND_COLOR,
    validations: {
      isRequired: E.Required.No,
      requiredMessage: "",
      formula: {
        id: "1",
        targetValue: true,
        target: "randomColor",
      },
    },
  },
  {
    id: C.COLOR,
    kind: C.INPUT_TYPES.INPUT_COLOR,
    label: C.COLOR,
    validations: {
      isRequired: E.Required.No,
      requiredMessage: "",
      formula: {
        id: "1",
        targetValue: true,
        target: "randomColor",
      },
    },
  },
  {
    id: C.CURRENCY,
    kind: C.INPUT_TYPES.INPUT_SELECT,
    label: C.CURRENCY,
    options: configApp?.currencies || [],
    validations: {
      isRequired: E.Required.Yes,
      requiredMessage: "Pole jest wymagane",
    },
  },
];

export const checkCurrency = (currency?: string, value?: number) => {
  const currencyChcker = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });

  return currencyChcker.format(value || 0);
};
