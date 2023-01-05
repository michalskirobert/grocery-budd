import { CustomFormModal } from "../shared/custom-form-modal";
import { useGroceriesService } from "./service";
import { setGroceryForm } from "./utils";
import { CustomNav } from "@components/shared/custom-nav";
import { CustomCard } from "@components/shared/custom-card";
import { Row } from "reactstrap";
import { checkCurrency } from "@components/home-page/utils";

import { Pie } from "react-chartjs-2";

import { ArcElement, Chart, SubTitle, Title, Tooltip, Legend } from "chart.js";
import { CustomBlockLoader } from "@components/shared";

import * as C from "@utils/constants";
import * as S from "./styles";

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
    parseGroceryData,
  } = useGroceriesService();

  Chart.register(SubTitle, Title, Tooltip, ArcElement, Legend);

  return (
    <CustomBlockLoader {...{ isBlocking: isLoading }}>
      <div>
        <Row>
          <div style={{ maxWidth: "300px", maxHeight: "300px" }}>
            <h2 style={{ textAlign: "center" }}>Chart shopping</h2>
            <Pie
              {...{
                data: parseGroceryData(),
                height: 300,
                width: 300,
              }}
            />
          </div>
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
            <span style={{ color: leftBudget < 0 ? "red" : "black" }}>
              {checkCurrency(currentBox?.currency?.value, leftBudget)}
            </span>
          </p>
          <p>
            Spent money:{" "}
            {checkCurrency(currentBox?.currency?.value, spentMoney)}
          </p>
          <S.CardWrapper>
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
                  <CustomCard
                    {...{
                      id,
                      category: category.label,
                      isPinned,
                      name,
                      shopName: shopName.label,
                      currency: currentBox?.currency?.value,
                      value,
                      handleRemove: removeGrocery,
                      handleEdit: window.open,
                      pieces,
                      color,
                      calculatedValue,
                    }}
                  />
                )
              )}
          </S.CardWrapper>
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
    </CustomBlockLoader>
  );
};

export default GroceryList;
