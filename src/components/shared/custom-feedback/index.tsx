import { NShared } from "@namespace/shared";

import * as S from "./styles";

export const CustomFormFeedback = ({
  error,
}: NShared.TCustomFormFeedbackProps) => {
  return <S.CustomFeedback>{error}</S.CustomFeedback>;
};
