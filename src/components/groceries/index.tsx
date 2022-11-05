import { CustomFormModal } from "../shared/custom-form-modal";
import { useGroceriesService } from "./service";
import { GROCERY_FORM } from "./utils";

import * as C from "src/utils/constants";

const GroceryList = () => {
  const {
    groceries,
    language,
    removeGrocery,
    isModalOpen,
    toggleFormModal,
    addGrocery,
  } = useGroceriesService();

  return (
    <div>
      {groceries?.map(({ id }) => (
        <div key={id}>
          <button {...{ onClick: () => removeGrocery(id) }}>
            Remove grocery
          </button>
        </div>
      ))}
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
