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

  const groceryDbPath = `${props?.user?.uid}/data/budgets/${groceryId}/groceries`;

  const toggleFormModal = () => setIsModalOpen(!isModalOpen);

  const getGroceries = async () => {
    if (!props?.user?.uid) return;

    try {
      const resp = await getCollection(groceryDbPath);
      setGroceries(resp.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      toast.error("invalid collection");
    }
  };

  const addGrocery = async (values: FormikValues) => {
    try {
      await addDocument(groceryDbPath, values);
      setGroceries((prev) => [...prev, values]);
      toast.success("Added!!");
      toggleFormModal();
    } catch (error) {
      toast.error("Invalid collection");
    }
  };

  const removeGrocery = async (id: string) => {
    try {
      await deleteDocument(`${groceryDbPath}/${id}`);
      setGroceries((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {}
  };

  useEffect(() => {
    getGroceries();

    return () => setGroceries([]);
  }, [props?.user]);

  return {
    ...props,
    removeGrocery,
    addGrocery,
    toggleFormModal,
    isModalOpen,
    groceries,
    groceryId,
  };
};
