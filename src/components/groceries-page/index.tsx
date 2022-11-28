import { CustomFormModal } from "../shared/custom-form-modal";
import { useGroceriesService } from "./service";
import { GROCERY_FORM } from "./utils";
import { Link } from "react-router-dom";
import { StarFill } from "react-bootstrap-icons";

import * as C from "@utils/constants";

const GroceryList = () => {
  const {
    removeGrocery,
    isModalOpen,
    toggleFormModal,
    addGrocery,
    isLoading,
    state,
    boxId,
  } = useGroceriesService();

  return (
    <div>
      {state?.user.groceries[String(boxId)]
        ?.sort((a) => (!a?.isPinned ? 1 : -1))
        .map(({ id, name, category, shopName, value, isPinned }) => (
          <div key={id}>
            {!!isPinned ? <StarFill /> : null}
            <p> {name}</p>
            <p> {category.label}</p>
            <p> {shopName.label}</p>
            <p>{value}</p>
            <button {...{ onClick: () => removeGrocery(id) }}>
              Remove grocery
            </button>
            <Link {...{ to: id }}>Edit grocery</Link>
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
            isLoading,
          }}
        />
      )}
    </div>
  );
};

export default GroceryList;
