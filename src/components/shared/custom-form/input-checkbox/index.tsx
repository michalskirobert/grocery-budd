import React from "react";
import { Input, Label } from "reactstrap";

export const InputSingleCheckbox = ({
  id,
  value,
  handleChange,
  internalLabel,
  check,
}) => (
  <>
    <Label {...{ check }}>{internalLabel}</Label>
    <Input
      {...{
        name: id,
        type: "checkbox",
        value,
        onChange: handleChange,
      }}
    />
  </>
);
