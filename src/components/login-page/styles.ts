import styled from "styled-components";
import { Link } from "react-router-dom";

import * as C from "@utils/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 350px;
`;

export const InformationContainer = styled.div`
  margin-top: 25px;
  text-align: center;
  width: 100%;
  line-height: 45px;
`;

export const text = styled.p`
  display: inline;
  margin-right: 10px;
`;

export const Redirect = styled(Link)`
  color: ${C.COLOR_BASE.BLUE};
  background: none;
  border: none;
  transition: color 0.5s;
  padding: 0;
  margin: 0;

  &:hover {
    color: ${C.COLOR_BASE.SALMON};
  }
`;

export const DetailsContainer = styled.div`
  line-height: 25px;
`;
