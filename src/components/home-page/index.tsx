import { CustomFormModal } from "@components/shared";
import { Button, Col, Row } from "reactstrap";
import { useHomePageService } from "./service";
import * as S from "./styles";
import { FORM } from "./utils";

const HomePage = () => {
  const { isModalOpen, toggleModal, boxes, createNewBox, removeBox } =
    useHomePageService();

  return (
    <S.Container>
      <Row>
        {boxes.map(({ color, name, id, budgetValue }) => (
          <Col>
            <S.Box {...{ color }}>
              {name} / {budgetValue}
            </S.Box>
            <Button onClick={() => removeBox(id)}>Remove</Button>
          </Col>
        ))}
        <Col>
          {boxes?.length < 4 && <S.Add {...{ onClick: toggleModal }}>+</S.Add>}
        </Col>
      </Row>
      <CustomFormModal
        {...{
          form: FORM,
          initialValues: {},
          isModalOpen: isModalOpen,
          onClick: createNewBox,
          title: "Budget",
          toggle: toggleModal,
        }}
      />
    </S.Container>
  );
};

export default HomePage;
