import { CustomFormFeedback } from "../custom-feedback";
import { RenderForm } from "./render-form";

import { NShared } from "@namespace/index";
import { Col, FormGroup, Label } from "reactstrap";

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
  errors,
  internalLabel,
  row,
  check,
  inline,
}: NShared.TCustomForm) => {
  const value = initialValue || values[id];
  const error = errors[id];

  return (
    <FormGroup {...{ row, check, inline }}>
      {!!label && <Label {...{ id }}>{label}</Label>}
      <Col>
        <RenderForm
          {...{
            errors,
            handleChange,
            id,
            kind,
            label,
            setFieldValue,
            values,
            initialValue,
            isDisabled,
            options,
            value,
            internalLabel,
            check,
            error,
          }}
        />
      </Col>
      <CustomFormFeedback {...{ error }} />
    </FormGroup>
  );
};
