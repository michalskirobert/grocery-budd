import { useContext } from "react";
import { Context } from "src/store/provider";
import { NProvider } from "src/typings";

import * as uuid from "uuid";

export const useGroceriesService = () => {
  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const removeGrocery = (id: string) =>
    props?.setGroceries((prev) => prev.filter((item) => item.id !== id));

  const addGrocery = (index: number) => {
    const newGrocery = {
      id: uuid.v4(),
      name: "",
      namePlaceholder: "Insert the name" + index + 1,
      category: "Grocery,Vegetables",
      price: "0.0" + index,
      currency: "PLN",
      isActive: true,
    };

    props?.setGroceries((prev) => [...prev, newGrocery]);
  };

  return {
    ...props,
    removeGrocery,
    addGrocery,
  };
};
