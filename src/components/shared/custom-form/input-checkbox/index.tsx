import React from "react";
import { Input, Label } from "reactstrap";

export const InputSingleCheckbox = ({
  id,
  value,
  handleChange,
  internalLabel,
  check,
  invalid,
}) => (
  <>
    <Label {...{ check }}>{internalLabel}</Label>
    <Input
      {...{
        name: id,
        type: "checkbox",
        value,
        invalid,
        onChange: handleChange,
      }}
    />
  </>
);
