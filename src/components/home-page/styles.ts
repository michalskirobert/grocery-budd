import styled from "styled-components";

export const Box = styled.div<{ color: string; backgroundColor: string }>`
  display: flex;
  width: 150px;
  height: 150px;
  margin: 30px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
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

export const EditBtn = styled.button<{ color: string }>`
  background: none;
  border: none;
  position: absolute;
  top: 100px;
  bottom: 0;
  left: 50px;
  color: ${({ color }) => color}
}
`;

export const RemoveBtn = styled.button<{ color: string }>`
  background: none;
  border: none;
  position: absolute;
  top: 100px;
  bottom: 0;
  left: 160px;
  color: ${({ color }) => color}
}
`;
