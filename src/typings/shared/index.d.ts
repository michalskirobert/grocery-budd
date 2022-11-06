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

  type TForm = {
    id: string;
    label: string;
    kind: string;
    options?: NProvider.TOptions[];
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
