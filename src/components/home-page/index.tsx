import { Link } from "react-router-dom";

import { CustomBlockLoader, CustomFormModal } from "@components/shared";
import { Col, Row } from "reactstrap";
import { useHomePageService } from "./service";
import { checkCurrency, setForm } from "./utils";

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
    state,
  } = useHomePageService();

  return (
    <CustomBlockLoader isBlocking={!!state?.isLoading}>
      <Row>
        {boxes
          ?.sort((a, b) => {
            return (
              new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime()
            );
          })
          .map(({ color, backgroundColor, title, id, budget, currency }) => (
            <Col key={id} style={{ position: "relative" }}>
              <Link {...{ to: `/groceries/${id}` }}>
                <S.Box {...{ color, backgroundColor }}>
                  <S.Title>{title}</S.Title>
                  <S.Line {...{ color }} />
                  <S.Budget>{checkCurrency(currency.value, budget)}</S.Budget>
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
      </Row>
      <Row>
        {(boxes ?? [])?.length < 4 && (
          <S.Add {...{ onClick: toggleModal }}>+</S.Add>
        )}
      </Row>
      {isModalOpen && (
        <CustomFormModal
          {...{
            form: setForm(state?.configApp),
            initialValues: {},
            isModalOpen: isModalOpen,
            onClick: createNewBox,
            title: "Budget",
            toggle: toggleModal,
          }}
        />
      )}
      <CustomFormModal
        {...{
          form: setForm(state?.configApp),
          initialValues: formikValues,
          isModalOpen: isEditModalOpen,
          onClick: updateBox,
          title: "Edit modal",
          toggle: toggleEditModal,
        }}
      />
    </CustomBlockLoader>
  );
};

export default HomePage;
