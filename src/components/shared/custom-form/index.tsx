import { Input, Label } from "reactstrap";

import Select from "react-select";

import { NShared } from "@namespace/index";
import { InputSwitch } from "./switch";

import * as C from "@utils/constants";

export const CustomForm = ({
  id,
  label,
  kind,
  values,
  options,
  handleChange,
  setFieldValue,
  initialValue,
  isDisabled,
}: NShared.iCustomForm) => {
  const value = initialValue || values[id];

  switch (kind) {
    case C.INPUT_TYPES.INPUT_TEXT:
      return (
        <>
          <Label {...{ id }}>{label}</Label>
          <Input
            {...{
              id,
              name: id,
              type: C.INPUT_TEXT_TYPE,
              value,
              onChange: handleChange,
            }}
          />
        </>
      );
    case C.INPUT_TYPES.INPUT_NUMBER:
      return (
        <>
          <Label {...{ id }}>{label}</Label>
          <Input
            {...{
              id,
              name: id,
              type: C.INPUT_NUMBER_TYPE,
              value,
              onChange: handleChange,
            }}
          />
        </>
      );
    case C.INPUT_TYPES.INPUT_SELECT:
      return (
        <>
          <Label {...{ id }}>{label}</Label>
          <Select
            {...{
              id,
              options,
              value: options?.find(({ value }) => value === value[id]),
              onChange: (e: any) => setFieldValue(id, e),
            }}
          />
        </>
      );
    case C.INPUT_TYPES.INPUT_PASSWORD:
      return (
        <>
          <Label {...{ id }}>{label}</Label>
          <Input
            {...{
              name: id,
              type: "password",
              value,
              onChange: handleChange,
            }}
          />
        </>
      );
    case C.INPUT_TYPES.INPUT_EMAIL:
      return (
        <>
          <Label {...{ id }}>{label}</Label>
          <Input
            {...{
              name: id,
              type: "email",
              value,
              onChange: handleChange,
            }}
          />
        </>
      );
    case C.INPUT_TYPES.INPUT_COLOR:
      return (
        <>
          <Label {...{ id }}>{label}</Label>
          <Input
            {...{
              name: id,
              type: "color",
              value,
              onChange: handleChange,
            }}
          />
        </>
      );
    case C.INPUT_TYPES.INPUT_COLOR:
      return (
        <>
          <Label {...{ id }}>{label}</Label>
          <Input
            {...{
              name: id,
              type: "color",
              value,
              onChange: handleChange,
            }}
          />
        </>
      );
    case C.INPUT_TYPES.INPUT_SWITCH:
      return (
        <InputSwitch
          {...{
            label,
            id,
            onChange: (e) => setFieldValue(id, e),
            value,
            isDisabled,
          }}
        />
      );
  }

  return null;
};
