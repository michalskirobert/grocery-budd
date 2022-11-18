import { useState, useContext } from "react";

import { FormikValues } from "formik";

import { Context } from "@store/provider";
import { NProvider } from "@namespace/index";

import * as uuid from "uuid";

export const useGroceriesService = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleFormModal = () => setIsModalOpen(!isModalOpen);

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const removeGrocery = (id: string) =>
    props?.setGroceries((prev) => prev.filter((item) => item.id !== id));

  const addGrocery = (values: FormikValues) => {
    const newGrocery = {
      id: uuid.v4(),
      name: values["name"],
      namePlaceholder: "Insert the name",
      category: values["category"],
      price: values["price"],
      currency: "PLN",
      isActive: true,
    };

    props?.setGroceries((prev) => [...prev, newGrocery]);

    toggleFormModal();
  };

  return {
    ...props,
    removeGrocery,
    addGrocery,
    toggleFormModal,
    isModalOpen,
  };
};
