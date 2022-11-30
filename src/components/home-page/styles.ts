import styled from "styled-components";

export const Box = styled.div<{ color: string; backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 150px;
  height: 150px;
  margin: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  align-items: center;
  justify-content: center;
  over-flow: hidden;
  transition: filter 0.5s;

  &:hover {
    filter: brightness(85%);
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    @keyframes shake {
      10%, 90% {
        transform: translate3d(-1px, 0, 0);
      }

      20%, 80% {
        transform: translate3d(2px, 0, 0);
      }

      30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
      }

      40%, 60% {
        transform: translate3d(4px, 0, 0);
      }
  }
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
  left: 30px;
  color: ${({ color }) => color};
  transition: opacity 0.5s;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

export const RemoveBtn = styled.button<{ color: string }>`
  background: none;
  border: none;
  position: absolute;
  top: 100px;
  bottom: 0;
  left: 130px;
  color: ${({ color }) => color};
  transition: opacity 0.5s;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

export const Budget = styled.div`
  margin-bottom: 20px;
`;

export const Title = styled.div`
  padding: 7px;
`;

export const Line = styled.hr<{ color: string }>`
width: 70%;
opacity: 0.5;
color ${({ color }) => color};
`;
