import { useContext } from "react";
import { Context } from "src/store/provider";
import { NProvider } from "src/typings";
import { CustomFormModal } from "../shared/custom-form-modal";
import { useGroceriesService } from "./service";
import { GROCERY_FORM } from "./utils";

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
      {groceries?.map(
        ({
          category,
          currency,
          id,
          isActive,
          name,
          namePlaceholder,
          price,
        }) => (
          <div key={id}>
            <h1>{name || namePlaceholder}</h1>
            <p>{category}</p>
            <span>{currency}</span>
            <b>{price}</b>
            <i>isActive: {!!isActive ? "YES" : "NO"}</i>
            <h4>{language?.label}</h4>
            <button {...{ onClick: () => removeGrocery(id) }}>-</button>
          </div>
        )
      )}
      <button {...{ onClick: toggleFormModal }}>+</button>
      {isModalOpen && (
        <CustomFormModal
          {...{
            initialValues: {},
            isModalOpen,
            title: "new",
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
