import { CustomFormFeedback } from "../custom-feedback";
import { RenderForm } from "./render-form";

import { NShared } from "@namespace/index";

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
}: NShared.TCustomForm) => {
  const value = initialValue || values[id];
  const error = errors[id];

  return (
    <>
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
        }}
      />
      <CustomFormFeedback {...{ error }} />
    </>
  );
};
