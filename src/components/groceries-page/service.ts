import { useState, useContext, useEffect } from "react";

import { FormikValues } from "formik";

import { Context } from "@store/provider";
import { NProvider } from "@namespace/index";

import { addDocument, deleteDocument, getCollection } from "src/firebase";
import { toast } from "react-toastify";
import { useParams, Params } from "react-router";

export const useGroceriesService = () => {
  const { groceryId } = useParams<Params>();

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [groceries, setGroceries] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const groceryDbPath = `users/${props?.state.user?.uid}/budgets/${groceryId}/groceries`;

  const toggleFormModal = () => setIsModalOpen(!isModalOpen);

  const getGroceries = async () => {
    if (!props?.state.user?.uid) return;

    try {
      setIsLoading(true);
      const resp = await getCollection(groceryDbPath);
      setGroceries(resp.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      toast.error("invalid collection");
    }

    setIsLoading(false);
  };

  const addGrocery = async (values: FormikValues) => {
    try {
      setIsLoading(true);
      console.log("problem with async");
      await addDocument(groceryDbPath, values);
      console.log({ values });
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
      setGroceries((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted!");
    } catch (error) {
      toast.error("Invalid collection");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getGroceries();

    return () => setGroceries([]);
  }, [props?.state.user?.boxes]);

  return {
    ...props,
    removeGrocery,
    addGrocery,
    toggleFormModal,
    isModalOpen,
    groceries,
    groceryId,
    isLoading,
  };
};
