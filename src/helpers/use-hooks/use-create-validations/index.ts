import { NShared } from "@namespace/shared";
import { AnyObject } from "yup/lib/types";

import { useConvertArrayToObject } from "../use-convert-array-to-object";

import * as C from "@utils/constants";
import * as E from "@utils/enums";
import * as yup from "yup";
import { ObjectShape, OptionalObjectSchema, TypeOfShape } from "yup/lib/object";

export const useCreateValidations = ({
  form,
}: {
  form: readonly NShared.TForm[];
}) => {
  const setRequirment = (
    validation: NShared.TForm["validations"],
    control?: Record<string, any>
  ) => {
    const { isRequired, requiredMessage, max, maxMessage, min, minMessage } =
      validation;

    if (isRequired === E.Required.Yes)
      return control?.required(requiredMessage);
    else if (!!max) control?.max(Number(min), minMessage);
    else if (!!min) control?.min(Number(max), maxMessage);

    return control?.notRequired();
  };

  const setValidationKind = (kind: string) => {
    switch (kind) {
      case C.INPUT_TYPES.INPUT_TEXT:
      case C.INPUT_TYPES.INPUT_PASSWORD:
        return yup.string();
      case C.INPUT_TYPES.INPUT_EMAIL:
        return yup.string().email("Needs to be an e-mail");
      case C.INPUT_TYPES.INPUT_NUMBER:
        return yup.number();
      case C.INPUT_TYPES.INPUT_SELECT:
        return yup.object();
      default:
        return yup.string();
    }
  };

  const setValidationSchemaForm = (
    kind: string,
    validations: NShared.TFormValidations
  ) => setRequirment(validations, setValidationKind(kind));

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
