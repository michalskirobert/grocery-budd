import { Input } from "reactstrap";

import Select, { SingleValue } from "react-select";

import { NProvider, NShared } from "@namespace/index";
import { InputSingleCheckbox } from "../input-checkbox";
import { InputSwitch } from "./../switch";

import * as C from "@utils/constants";

export const RenderForm = ({
  kind,
  id,
  handleChange,
  setFieldValue,
  value,
  disabled,
  options,
  internalLabel,
  check,
  error,
}: NShared.TCustomFormRenderFormProps) => {
  switch (kind) {
    case C.INPUT_TYPES.INPUT_TEXT:
      return (
        <Input
          {...{
            id,
            name: id,
            type: C.INPUT_TEXT_TYPE,
            value,
            invalid: !!error,
            onChange: handleChange,
            disabled,
          }}
        />
      );
    case C.INPUT_TYPES.INPUT_NUMBER:
      return (
        <Input
          {...{
            id,
            name: id,
            type: C.INPUT_NUMBER_TYPE,
            value,
            invalid: !!error,
            onChange: handleChange,
            disabled,
          }}
        />
      );
    case C.INPUT_TYPES.INPUT_SELECT:
      return (
        <Select
          {...{
            id,
            options,
            value,
            styles: {
              control: (prov) => ({
                ...prov,
                borderColor: !!error ? C.COLOR_BASE.ERROR : prov.borderColor,
              }),
            },
            onChange: (e: SingleValue<NProvider.TOptions>) =>
              setFieldValue(id, e),
            disabled,
          }}
        />
      );
    case C.INPUT_TYPES.INPUT_PASSWORD:
      return (
        <Input
          {...{
            name: id,
            type: "password",
            value,
            invalid: !!error,
            onChange: handleChange,
            disabled,
          }}
        />
      );
    case C.INPUT_TYPES.INPUT_EMAIL:
      return (
        <Input
          {...{
            name: id,
            type: "email",
            value,
            invalid: !!error,
            onChange: handleChange,
            disabled,
          }}
        />
      );
    case C.INPUT_TYPES.INPUT_COLOR:
      return (
        <Input
          {...{
            name: id,
            type: "color",
            value,
            invalid: !!error,
            onChange: handleChange,
            disabled,
          }}
        />
      );
    case C.INPUT_TYPES.INPUT_SWITCH:
      return (
        <InputSwitch
          {...{
            label: String(internalLabel),
            id,
            onChange: (e) => setFieldValue(id, e),
            value,
            isDisabled: disabled,
          }}
        />
      );
    case C.INPUT_TYPES.INPUT_SINGLE_CHECKBOX:
      return (
        <InputSingleCheckbox
          {...{
            id,
            handleChange,
            internalLabel,
            value,
            check,
            invalid: !!error,
            disabled,
          }}
        />
      );

    default:
      return null;
  }
};
