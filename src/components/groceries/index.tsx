import { useContext } from "react";
import { Context } from "src/store/provider";
import { NProvider } from "src/typings";
import { useGroceriesService } from "./service";

export const GroceryList = () => {
  const { groceries, language, removeGrocery, addGrocery } =
    useGroceriesService();

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
      <button {...{ onClick: () => addGrocery(1) }}>+</button>
    </div>
  );
};
