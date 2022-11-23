import { initialGroceryHelper } from "@store/provider/utils";
import { Link } from "react-router-dom";

export const GroceryPage = () => {
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
          <button>
            <div key={id}>
              <h1>{name || namePlaceholder}</h1>
              <p>{category}</p>
              <span>{currency}</span>
              <b>{price}</b>
              <i>isActive: {isActive}</i>
            </div>
          </button>
        )
      )}
    </div>
  );
};

export default GroceryPage;
