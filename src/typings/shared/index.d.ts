import { FormikErrors, FormikValues } from "formik";
import { NProvider, NReducer } from "..";

export declare namespace NShared {
  type S = string;
  type N = number;
  type D = Date;
  type B = boolean;
  type JSX = JSX.Element;

  type TCustomForm = {
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
    errors: FormikErrors<FormikValues>;
    internalLabel?: S;
    row?: B;
    check?: B;
    inline?: B;
    formula?: NShared.TForm["validations"]["formula"];
    isCalculatingActive?: TForm["isCalculatingActive"];
    calculate?: TForm["calculate"];
  };

  type TCustomFormRenderFormProps = {
    value: any;
    error?: S | S[] | FormikErrors<any> | FormikErrors<any>[];
    disabled?: B;
  } & TCustomForm;

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
    | "input-group-fields"
    | "captcha";

  type TValidationFormula = {
    id: S;
    targetValue: S | N | B | null;
    target: S;
  };

  type TFormValidations = {
    isRequired: 10 | 20;
    requiredMessage: S;
    min?: N;
    minMessage?: S;
    max?: N;
    maxMessage?: S;
    formula?: TValidationFormula;
  };

  type TCalculate = {
    mainValue: S;
    operator: "*" | "+" | "-" | "(" | ")" | "%" | "/";
    calculateBy: S;
  };

  type TForm = readonly {
    id: string;
    label: string;
    kind: TFormKinds;
    validations: TFormValidations;
    isCalculatingActive?: B;
    calculate?: TCalculate;
    placeholder?: S;
    initialValue?: S | N | { label: S; value: S } | B;
    options?: NProvider.TOptions[];
    isPositionAddable?: B;
    internalLabel?: S;
    row?: B;
    check?: B;
    inline?: B;
  };

  type TCheckIsModalValidated = { isBlocked: B; errorMessage: S };

  type ICustomFormModal = {
    toggle: () => void;
    initialValues: FormikValues;
    isModalOpen: B;
    title: S;
    onClick: (values: FormikValues) => void;
    form: readonly TForm[];
    isLoading?: B;
    checkIsModalValid?: (values: FormikValues) => TCheckIsModalValidated;
  };

  type ICustomLoader = {
    children: JSX.Element;
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

  type TCustomCard = {
    id: S;
    name: S;
    category: S;
    shopName: S;
    value: N;
    pieces: N;
    isPinned?: B;
    handleRemove: (id: string) => Promise<void>;
    handleEdit: (id: string) => void;
    color: S;
    currency?: S;
    calculatedValue: N;
  };

  type TCustomFormFeedbackProps = {
    error: FormikErrors;
  };
}
