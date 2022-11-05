import { Input, Label } from "reactstrap";

import Select from "react-select";

import { NShared } from "src/typings";

import * as C from "@utils/constants";

export const CustomForm = ({
  id,
  label,
  kind,
  values,
  handleChange,
  setFieldValue,
}: NShared.iCustomForm) => {
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
              values: values[id],
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
              values: values[id],
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
              options: [
                { label: "Grocery", value: "Groceries" },
                { label: "idk", value: "idk" },
              ],
              onChange: (e: any) => setFieldValue(id, e.currentTarget.value),
            }}
          />
        </>
      );
  }

  return <div></div>;
};
