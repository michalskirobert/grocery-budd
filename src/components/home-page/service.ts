import { useContext, useEffect, useState } from "react";
import { Context } from "@store/provider";
import { NProvider } from "@namespace/provider";
import {
  addDocument,
  deleteDocument,
  setDocument,
  updateDocument,
} from "src/firebase";

import * as uuid from "uuid/v4";

import * as C from "@utils/constants";
import { toast } from "react-toastify";
import { FormikValues } from "formik";

export const useHomePageService = () => {
  const contextValues = useContext<NProvider.TContextApiProps | null>(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [boxes, setBoxes] = useState<any[]>([]);

  const [formikValues, setFormikValues] = useState<FormikValues>({});

  const createNewBox = async (values: FormikValues) => {
    if (!contextValues?.user?.uid) return;

    try {
      const body = {
        ...values,
        budgetValue: `${values[C.CURRENCY]?.value}${values.budget}`,
        budget: values.budget,
        currency: values.currency,
      };

      await addDocument(`${contextValues?.user?.uid}/data/budgets`, body);

      setBoxes((prev) => [...prev, body]);

      toggleModal();
      toast.success("Zapisano");
    } catch (error) {}
  };

  const updateBox = async (values: FormikValues) => {
    try {
      const box = boxes?.find(({ uid }) => uid === values.id);

      const body = { ...box, ...values };

      await updateDocument(
        `${contextValues?.user.uid}/data/budgets/${values.id}`,
        body
      );
      console.log(body, box, boxes);
      toast.success("Pomyślnie zedytowana");
      setBoxes((prev) =>
        prev.filter((item) => item.id !== values.id).concat(body)
      );
      toggleEditModal();
    } catch (error) {
      toast.error("Nie można z edytować boksu");
    }
  };

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const openEditModal = (id: string) => {
    setFormikValues({});

    const formikValues = boxes.find((box) => box.id === id);

    setFormikValues(formikValues);

    toggleEditModal();
  };

  const removeBox = async (id: string) => {
    try {
      const filteredBoxes = boxes.filter((box) => box.id !== id);
      await deleteDocument(`${contextValues?.user.uid}/data/budgets/${id}`);
      setBoxes(filteredBoxes);
      toast.success("usunięto");
    } catch (error) {
      toast.error("wystąpił błąd ;)");
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    setBoxes(contextValues?.userData?.boxes || []);
  }, [contextValues?.userData?.boxes]);

  return {
    ...contextValues,
    toggleModal,
    isModalOpen,
    createNewBox,
    removeBox,
    boxes,
    updateBox,
    toggleEditModal,
    isEditModalOpen,
    formikValues,
    openEditModal,
  };
};
