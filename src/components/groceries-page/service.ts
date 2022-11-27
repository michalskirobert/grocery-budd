import { useState, useContext, useEffect } from "react";

import { FormikValues } from "formik";

import { Context } from "@store/provider";
import { NProvider } from "@namespace/index";

import { addDocument, deleteDocument, getCollection } from "src/firebase";
import { toast } from "react-toastify";
import { useParams, Params } from "react-router";
import { addNewGrocery } from "@store/actions";

export const useGroceriesService = () => {
  const { boxId } = useParams<Params>();

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const groceryDbPath = `users/${props?.state.user?.uid}/budgets/${boxId}/groceries`;

  const groceries = props?.state?.user?.boxes?.find(
    (box) => box.id === boxId
  )?.groceries;

  const toggleFormModal = () => setIsModalOpen(!isModalOpen);

  const addGrocery = async (values: FormikValues) => {
    try {
      setIsLoading(true);
      await addDocument(groceryDbPath, values);
      props?.dispatch(addNewGrocery(values, boxId));
      toast.success("Added!!");
      toggleFormModal();
    } catch (error) {
      toast.error("Invalid collection");
    }

    setIsLoading(false);
  };

  const removeGrocery = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteDocument(`${groceryDbPath}/${id}`);
      toast.success("Deleted!");
    } catch (error) {
      toast.error("Invalid collection");
    }

    setIsLoading(false);
  };

  return {
    ...props,
    removeGrocery,
    addGrocery,
    toggleFormModal,
    isModalOpen,
    groceries,
    isLoading,
  };
};
