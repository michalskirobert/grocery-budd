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
      <T = string | React.ChangeEvent<any>>(
        field: T
      ): T extends React.ChangeEvent<any>
        ? void
        : (e: string | React.ChangeEvent<any>) => void;
    };
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void;
  };

  type TFormKinds =
    | "input-text"
    | "input-checkbox"
    | "input-number"
    | "input-select"
    | "input-password"
    | "input-email";

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
    options?: NProvider.TOptions[];
    validations: TFormValidations;
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
}
