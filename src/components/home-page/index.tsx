import { CustomFormModal } from "@components/shared";
import { Button, Col, Row } from "reactstrap";
import { useHomePageService } from "./service";
import { FORM } from "./utils";

import * as S from "./styles";

const HomePage = () => {
  const {
    isModalOpen,
    toggleModal,
    boxes,
    createNewBox,
    removeBox,
    userData,
    updateBox,
    toggleEditModal,
    isEditModalOpen,
    formikValues,
    openEditModal,
  } = useHomePageService();

  return (
    <S.Container>
      <h1>{userData?.nickname}</h1>
      <Row>
        {boxes?.map(({ color, backgroundColor, title, id, budgetValue }) => (
          <Col key={id}>
            <S.Box {...{ color, backgroundColor }}>
              {title} / {budgetValue}
            </S.Box>
            <Button onClick={() => removeBox(id)}>Remove</Button>
            <Button onClick={() => openEditModal(id)}>Edit box</Button>
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
      <CustomFormModal
        {...{
          form: FORM,
          initialValues: formikValues,
          isModalOpen: isEditModalOpen,
          onClick: updateBox,
          title: "Edit modal",
          toggle: toggleEditModal,
        }}
      />
    </S.Container>
  );
};

export default HomePage;
