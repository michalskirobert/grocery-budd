import styled from "styled-components";

import Switch from "react-switch";

export const CustomSwitch = styled(Switch)<{
  is_yes: boolean;
  isDisabled?: boolean;
}>`
  margin-top: 10px;
  .react-switch-bg {
    color: #fff !important;
    font-size: 0.9rem;
    height: 26px !important;
    pointer-events: ${({ isDisabled }) =>
      isDisabled ? "none !important" : "all"};
    width: 62px !important;

    div {
      align-items: center;
      display: flex;
      justify-content: center;
      pointer-events: ${({ isDisabled }) =>
        isDisabled ? "none !important" : "all"};
      width: 50px;
    }
  }

  .react-switch-handle {
    height: 22px !important;
    pointer-events: ${({ isDisabled }) =>
      isDisabled ? "none !important" : "all"};
    top: 2px !important;
    transform: ${({ is_yes }) =>
      is_yes ? "translateX(38px) !important" : "translateX(0)"};
    width: 22px !important;
  }
`;

export const CustomLabel = styled.div<{ is_yes: boolean }>`
  align-items: center;
  display: flex;
  margin-bottom: 2px;
  margin-left: ${({ is_yes }) => (is_yes ? "-20px" : "15px")};
  position: relative;
  right: ${({ is_yes }) => (is_yes ? "-0.2rem" : "0.2rem")};
`;

export const SwitchContainer = styled.div`
  margin: 5px 0 0 2px;
  display: flex;
}
`;

export const SwitchLabel = styled.div`
  margin-top: 10px;
  padding-right: 20px;
`;
