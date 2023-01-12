import { CustomFormModal } from "../shared/custom-form-modal";
import { useGroceriesService } from "./service";
import { setGroceryForm } from "./utils";
import { CustomNav } from "@components/shared/custom-nav";
import { CustomCard } from "@components/shared/custom-card";
import { Row } from "reactstrap";
import { checkCurrency } from "@components/home-page/utils";

import { CustomBlockLoader } from "@components/shared";

import * as C from "@utils/constants";
import * as S from "./styles";
import { Statistics } from "./chart-statistics";
import { Filters } from "./filters-modal";

const GroceryList = () => {
  const {
    removeGrocery,
    isModalOpen,
    toggleFormModal,
    addGrocery,
    isLoading,
    state,
    spentMoney,
    leftBudget,
    currentBox,
    checkIsModalValid,
    parseGroceryData,
    isEditModalOpen,
    toggleEditModal,
    openEditModal,
    formikValues,
    editCurrentGrocery,
    toggleFiltersModal,
    isFiltersModalOpen,
    groceriesList,
    setGroceriesList,
    handleButtons,
    onFilters,
  } = useGroceriesService();

  return (
    <CustomBlockLoader {...{ isBlocking: isLoading }}>
      <div>
        <Row>
          <CustomNav
            {...{
              nav: [
                {
                  content: "Search",
                  type: "link",
                  eventKey: "search",
                },
                {
                  content: "Sortings",
                  type: "dropdown",
                  options: [
                    { content: "By pins", eventKey: "pin" },
                    { content: "By name", eventKey: "name" },
                    { content: "By date", eventKey: "date" },
                    { content: "By price", eventKey: "price" },
                    { content: "By Shop", eventKey: "shop" },
                  ],
                },
              ],
              handleButtons,
            }}
          />
          <Statistics {...{ data: parseGroceryData() }} />
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
            {groceriesList?.map(
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
                    shopName: shopName?.label,
                    currency: currentBox?.currency?.value,
                    value,
                    handleRemove: removeGrocery,
                    handleEdit: openEditModal,
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
        {isEditModalOpen && (
          <CustomFormModal
            {...{
              initialValues: formikValues,
              isModalOpen: isEditModalOpen,
              title: formikValues.name,
              toggle: toggleEditModal,
              onClick: editCurrentGrocery,
              form: setGroceryForm(state?.configApp),
              isLoading,
              checkIsModalValid,
            }}
          />
        )}
        <Filters
          {...{
            isLoading,
            toggle: toggleFiltersModal,
            isOpen: isFiltersModalOpen,
            onFilters,
          }}
        />
      </div>
    </CustomBlockLoader>
  );
};

export default GroceryList;
