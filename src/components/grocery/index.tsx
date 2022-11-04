import React from "react";
import { initialGroceryHelper } from "src/store/provider/utils";

export const GroceryList = () => {
  return (
    <div>
      {initialGroceryHelper.map(
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
            <i>isActive: {isActive}</i>
          </div>
        )
      )}
    </div>
  );
};
