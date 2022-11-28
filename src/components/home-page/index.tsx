import { Link } from "react-router-dom";

import { CustomFormModal } from "@components/shared";
import { Button, Col, Row } from "reactstrap";
import { useHomePageService } from "./service";
import { FORM } from "./utils";

import { Pencil, Trash } from "react-bootstrap-icons";

import * as S from "./styles";

const HomePage = () => {
  const {
    isModalOpen,
    toggleModal,
    boxes,
    createNewBox,
    removeBox,
    updateBox,
    toggleEditModal,
    isEditModalOpen,
    formikValues,
    openEditModal,
  } = useHomePageService();

  return (
    <S.Container>
      <Row>
        {boxes?.map(({ color, backgroundColor, title, id, budgetValue }) => (
          <Col key={id} style={{ position: "relative" }}>
            <Link {...{ to: `/groceries/${id}` }}>
              <S.Box {...{ color, backgroundColor }}>
                {title} / {budgetValue}
              </S.Box>
            </Link>
            <S.RemoveBtn {...{ color, onClick: () => removeBox(id) }}>
              <Trash />
            </S.RemoveBtn>
            <S.EditBtn {...{ color, onClick: () => openEditModal(id) }}>
              <Pencil />
            </S.EditBtn>
          </Col>
        ))}
        <Col>
          {(boxes ?? [])?.length < 4 && (
            <S.Add {...{ onClick: toggleModal }}>+</S.Add>
          )}
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
