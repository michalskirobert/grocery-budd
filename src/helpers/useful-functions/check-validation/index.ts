import { NShared } from "@namespace/shared";
import { FormikValues } from "formik";

interface IProps {
  formula?: NShared.TForm["validations"]["formula"];
  values?: FormikValues;
}

export const checkIsValid = ({ formula, values }: IProps) =>
  !!formula?.target && values?.[formula.target] === formula?.targetValue;
