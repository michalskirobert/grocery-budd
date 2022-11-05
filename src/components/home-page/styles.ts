import styled from "styled-components";

export const Box = styled.div<{ color: string }>`
  display: flex;
  width: 150px;
  height: 150px;
  margin: 30px;
  background-color: ${({ color }) => color};
  color: white;
  align-items: center;
  justify-content: center;
  over-flow: hidden;
`;

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Add = styled.button`
  background: none;
  color: black;
  border: none;
  font-size: 6rem;
  margin-top: 9px;
`;
