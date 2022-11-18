import { CustomFormModal } from "@components/shared";
import { Button, Col, Row } from "reactstrap";
import { useHomePageService } from "./service";
import { FORM } from "./utils";

import * as S from "./styles";

const HomePage = () => {
  const { isModalOpen, toggleModal, boxes, createNewBox, removeBox, userData } =
    useHomePageService();

  return (
    <S.Container>
      <h1>{userData?.nickname}</h1>
      <Row>
        {boxes?.map(({ color, name, id, budgetValue }) => (
          <Col key={id}>
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
