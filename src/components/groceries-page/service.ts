import { useState, useContext, useEffect } from "react";

import { FormikValues } from "formik";

import { Context } from "@store/provider";
import { NProvider } from "@namespace/index";

import { addDocument, deleteDocument, getCollection } from "src/firebase";
import { toast } from "react-toastify";
import { useParams, Params } from "react-router";
import { addNewGrocery, deleteGrocery, setGroceries } from "@store/actions";

export const useGroceriesService = () => {
  const { boxId } = useParams<Params>();

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const groceryDbPath = `users/${props?.state.user?.uid}/budgets/${boxId}/groceries`;

  const toggleFormModal = () => setIsModalOpen(!isModalOpen);

  const getGroceries = async () => {
    if (!boxId) return;

    try {
      setIsLoading(true);
      const resp = await getCollection(groceryDbPath);
      props?.dispatch(
        setGroceries(
          resp.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
          boxId
        )
      );
    } catch (error) {
      toast.error("error");
    }

    setIsLoading(false);
  };

  console.log({ state: props?.state.user.groceries });

  const addGrocery = async (values: FormikValues) => {
    if (!boxId) return;

    try {
      setIsLoading(true);
      const resp = await addDocument(groceryDbPath, values);
      props?.dispatch(addNewGrocery({ ...values, id: resp.id }, boxId));
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
      props?.dispatch(deleteGrocery(String(boxId), id));
      toast.success("Deleted!");
    } catch (error) {
      toast.error("Invalid collection");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getGroceries();
  }, [boxId]);

  return {
    ...props,
    removeGrocery,
    addGrocery,
    toggleFormModal,
    isModalOpen,
    isLoading,
    boxId,
  };
};
