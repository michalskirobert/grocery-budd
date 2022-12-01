import styled from "styled-components";

import * as C from "@utils/constants";
import { StarFill } from "react-bootstrap-icons";

export const RemoveBtn = styled.button`
  display: flex;
  justify-content: flex-end;
  background: none;
  border: none;
  bottom: 0;
  color: ${C.COLOR_BASE.GREY};
  transition: opacity 0.5s;
  opacity: 0.5;
  font-size: 1rem;
  font-size: bold;
  width: 100%;

  &:hover {
    opacity: 1;
  }
`;

export const EditBtn = styled.button`
  display: flex;
  justify-content: flex-end;
  background: none;
  border: none;
  bottom: 0;
  color: ${C.COLOR_BASE.GREY};
  transition: opacity 0.5s;
  opacity: 0.5;
  font-size: 1rem;
  font-size: bold;
  width: 100%;

  &:hover {
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Title = styled.p`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Icon = styled(StarFill)`
  margin-right: 10px;
`;
