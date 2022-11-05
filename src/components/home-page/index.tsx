import { Button, Col, Row } from "reactstrap";
import * as S from "./styles";

const HomePage = () => {
  const temporary = [
    { color: "red", title: "xxxx" },
    { color: "blue", title: "xxxx" },
    { color: "green", title: "xxxx" },
    { color: "yellow", title: "xxxx" },
  ];
  return (
    <S.Container>
      <Row>
        {temporary.map(({ color, title }) => (
          <Col>
            <S.Box {...{ color }}>{title}</S.Box>
          </Col>
        ))}
        <Col>{temporary?.length < 4 && <S.Add>+</S.Add>}</Col>
      </Row>
    </S.Container>
  );
};

export default HomePage;
