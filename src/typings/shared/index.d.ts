import { FormikValues } from "formik";
import { NProvider } from "..";

export declare namespace NShared {
  type S = string;
  type N = number;
  type D = Date;
  type B = boolean;
  type JSX = JSX.Element;

  type iCustomForm = {
    id: S;
    kind: S;
    label: S;
    values: FormikValues;
    options?: NProvider.TOptions[];
    handleChange: {
      (e: React.ChangeEvent<any>): void;
      <T = S | React.ChangeEvent<any>>(
        field: T
      ): T extends React.ChangeEvent<any>
        ? void
        : (e: S | React.ChangeEvent<any>) => void;
    };
    setFieldValue: (field: S, value: any, shouldValidate?: B) => void;
    isDisabled?: B;
    initialValue?: TForm["initialValue"];
  };

  type TFormKinds =
    | "input-text"
    | "input-checkbox"
    | "input-number"
    | "input-select"
    | "input-password"
    | "input-email"
    | "input-color"
    | "input-switch"
    | "input-radio-button"
    | "input-multiple-checkboxes"
    | "input-single-checkbox"
    | "input-group-fields";

  type TFormValidations = {
    isRequired: 10 | 20;
    requiredMessage: S;
    min?: N;
    minMessage?: S;
    max?: N;
    maxMessage?: S;
  };

  type TForm = readonly {
    id: string;
    label: string;
    kind: TFormKinds;
    validations: TFormValidations;
    placeholder?: S;
    initialValue?: S | { label: S; value: S } | B;
    options?: NProvider.TOptions[];
    isPositionAddable?: B;
  };

  type ICustomFormModal = {
    toggle: () => void;
    initialValues: FormikValues;
    isModalOpen: B;
    title: S;
    onClick: (values: FormikValues) => void;
    form: readonly TForm[];
  };

  type ICustomLoader = {
    children: JSX;
    isBlocking: B;
  };

  type IInputSwitch = {
    id: S;
    value: B;
    onChange: (
      checked: B,
      event:
        | MouseEvent
        | React.SyntheticEvent<MouseEvent | KeyboardEvent, Event>,
      id: S
    ) => void;
    label: S;
    isDisabled?: B;
  };
}
