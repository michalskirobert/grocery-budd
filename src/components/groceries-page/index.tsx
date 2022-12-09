import { CustomFormModal } from "../shared/custom-form-modal";
import { useGroceriesService } from "./service";
import { GROCERY_COLORS, setGroceryForm } from "./utils";
import { CustomNav } from "@components/shared/custom-nav";
import { CustomCard } from "@components/shared/custom-card";
import { Row } from "reactstrap";
import { Col } from "react-bootstrap";

import * as C from "@utils/constants";
import * as S from "./styles";
import { checkCurrency } from "@components/home-page/utils";

const GroceryList = () => {
  const {
    removeGrocery,
    isModalOpen,
    toggleFormModal,
    addGrocery,
    isLoading,
    state,
    boxId,
    spentMoney,
    leftBudget,
    currentBox,
    checkIsModalValid,
  } = useGroceriesService();

  return (
    <div>
      <Row>
        <CustomNav
          {...{
            nav: [
              { content: "Search", type: "link", eventKey: "1" },
              {
                content: "Sorting",
                type: "dropdown",
                options: [
                  { content: "By name", eventKey: "1.2" },
                  { content: "By date", eventKey: "1.3" },
                  { content: "By price", eventKey: "1.4" },
                ],
              },
            ],
          }}
        />
        <p>
          Left budget:{" "}
          <span style={{ color: leftBudget < 0 ? "red" : "#1111" }}>
            {checkCurrency(currentBox?.currency.value, leftBudget)}
          </span>
        </p>
        <p>
          Spent money: {checkCurrency(currentBox?.currency.value, spentMoney)}
        </p>
        {state?.user.groceries[String(boxId)]
          ?.sort((a) => (!a?.isPinned ? 1 : -1))
          .map(
            ({
              id,
              name,
              category,
              shopName,
              value,
              isPinned,
              pieces,
              color,
              calculatedValue,
            }) => (
              <Col>
                <CustomCard
                  {...{
                    id,
                    category,
                    isPinned,
                    name,
                    shopName,
                    currency: currentBox?.currency.value,
                    value,
                    handleRemove: removeGrocery,
                    handleEdit: window.open,
                    pieces,
                    color,
                    calculatedValue,
                  }}
                />
              </Col>
            )
          )}
      </Row>
      <Row>
        <S.Add {...{ onClick: toggleFormModal }}>+</S.Add>
      </Row>
      {isModalOpen && (
        <CustomFormModal
          {...{
            initialValues: {},
            isModalOpen,
            title: C.GROCERY_MODAL_TITLE,
            toggle: toggleFormModal,
            onClick: addGrocery,
            form: setGroceryForm(state?.configApp),
            isLoading,
            checkIsModalValid,
          }}
        />
      )}
    </div>
  );
};

export default GroceryList;
