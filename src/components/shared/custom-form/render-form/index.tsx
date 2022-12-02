import { Col, FormGroup, Input, Label } from "reactstrap";

import Select from "react-select";

import { NShared } from "@namespace/index";
import { InputSwitch } from "./../switch";

import * as C from "@utils/constants";
import { InputSingleCheckbox } from "../input-checkbox";

export const RenderForm = ({
  kind,
  id,
  handleChange,
  setFieldValue,
  value,
  isDisabled,
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
          }}
        />
      );
    case C.INPUT_TYPES.INPUT_SELECT:
      return (
        <Select
          {...{
            id,
            options,
            value: options?.find(({ value }) => value === value[id]),
            "aria-invalid": !!error,
            onChange: (e: any) => setFieldValue(id, e),
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
            isDisabled,
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
          }}
        />
      );

    default:
      return null;
  }
};
