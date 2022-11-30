import { NShared } from "@namespace/shared";

import { useConvertArrayToObject } from "../use-convert-array-to-object";

import * as C from "@utils/constants";
import * as E from "@utils/enums";
import * as yup from "yup";

export const useCreateValidations = ({
  form,
}: {
  form: readonly NShared.TForm[];
}) => {
  const setRequirment = (
    validation: NShared.TForm["validations"],
    control?: any
  ) => {
    const { isRequired, requiredMessage } = validation;

    if (isRequired === E.Required.Yes) {
      return control?.required(requiredMessage);
    }

    return control?.notRequired();
  };

  const setValidationKind = (kind: string) => {
    switch (kind) {
      case C.INPUT_TYPES.INPUT_TEXT:
      case C.INPUT_TYPES.INPUT_PASSWORD:
      case C.INPUT_TYPES.INPUT_COLOR:
        return yup.string();
      case C.INPUT_TYPES.INPUT_EMAIL:
        return yup.string().email("Needs to be an e-mail");
      case C.INPUT_TYPES.INPUT_NUMBER:
        return yup.number();
      case C.INPUT_TYPES.INPUT_SELECT:
        return yup.object();
      case C.INPUT_TYPES.INPUT_SWITCH:
        return yup.bool();
      default:
        return yup.string();
    }
  };

  const setValidationSchemaForm = (
    kind: string,
    validations: NShared.TFormValidations
  ) => {
    const { max, maxMessage, min, minMessage } = validations;
    let valid = setRequirment(validations, setValidationKind(kind));

    if (!!max) valid = valid?.max(Number(max), maxMessage);
    if (!!min) valid = valid?.min(Number(min), minMessage);

    return valid;
  };

  let mergedSchema: Record<string, any> = {};

  const parsedForm = form?.flatMap((item) => {
    mergedSchema = {
      ...mergedSchema,
      [item.id]: setValidationSchemaForm(item.kind, item.validations),
    };

    return mergedSchema;
  });

  return {
    validationSchema: yup
      .object()
      .shape({ ...useConvertArrayToObject(parsedForm) }),
  };
};
