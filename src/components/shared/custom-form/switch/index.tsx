import { NShared } from "@namespace/shared";

import * as C from "@utils/constants";
import * as S from "./styles";

export const InputSwitch = ({
  id,
  value,
  onChange,
  label,
  isDisabled,
}: NShared.IInputSwitch) => (
  <S.SwitchContainer>
    <S.SwitchLabel>{label}</S.SwitchLabel>
    <S.CustomSwitch
      {...{
        id,
        checked: value,
        onChange,
        className: "mr-2 mb-2",
        uncheckedIcon: <S.CustomLabel {...{ is_yes: true }}>No</S.CustomLabel>,
        checkedIcon: <S.CustomLabel {...{ is_yes: false }}>Yes</S.CustomLabel>,
        is_yes: value,
        isDisabled,
      }}
    />
  </S.SwitchContainer>
);
