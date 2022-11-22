import { CustomFormModal } from "../shared/custom-form-modal";
import { useGroceriesService } from "./service";
import { GROCERY_FORM } from "./utils";
import { Link } from "react-router-dom";

import * as C from "@utils/constants";

const GroceryList = () => {
  const {
    groceries,
    removeGrocery,
    isModalOpen,
    toggleFormModal,
    addGrocery,
    groceryId,
  } = useGroceriesService();

  return (
    <div>
      {groceries?.map(
        ({ id, name, category, isActive, shopName, value, isPinned }) => (
          <div key={id}>
            {name}
            {category.label}
            {shopName.label}
            {value}
            {isPinned}
            {isActive}
            <button {...{ onClick: () => removeGrocery(id) }}>
              Remove grocery
            </button>
            <Link {...{ to: `grocery/${groceryId}/${id}` }}>Edit grocery </Link>
          </div>
        )
      )}
      <button {...{ onClick: toggleFormModal }}>Add grocery</button>
      {isModalOpen && (
        <CustomFormModal
          {...{
            initialValues: {},
            isModalOpen,
            title: C.GROCERY_MODAL_TITLE,
            toggle: toggleFormModal,
            onClick: addGrocery,
            form: GROCERY_FORM,
          }}
        />
      )}
    </div>
  );
};

export default GroceryList;
