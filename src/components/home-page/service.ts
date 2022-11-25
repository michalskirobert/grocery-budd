import { useContext, useEffect, useState } from "react";
import { Context } from "@store/provider";
import { NProvider } from "@namespace/provider";
import { addDocument, deleteDocument, updateDocument } from "src/firebase";
import { toast } from "react-toastify";
import { FormikValues } from "formik";

import * as C from "@utils/constants";
import { setBoxes } from "@store/actions";

export const useHomePageService = () => {
  const contextValues = useContext<NProvider.TContextApiProps | null>(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const budgetCollection = `users/${contextValues?.state.user?.uid}/budgets`;

  const [formikValues, setFormikValues] = useState<FormikValues>({});

  const createNewBox = async (values: FormikValues) => {
    if (!contextValues?.state.user?.uid) return;

    try {
      const body = {
        ...values,
        budgetValue: `${values[C.CURRENCY]?.value}${values.budget}`,
        budget: values.budget,
        currency: values.currency,
      };

      await addDocument(budgetCollection, body);

      contextValues.dispatch(
        setBoxes([...contextValues.state.user.boxes, body])
      );

      toggleModal();
      toast.success("Zapisano");
    } catch (error) {}
  };

  const updateBox = async (values: FormikValues) => {
    try {
      const box = contextValues?.state.user.boxes?.find(
        ({ id }) => id === values.id
      );

      const body = { ...box, ...values };

      await updateDocument(`${budgetCollection}/${values.id}`, body);

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

    const formikValues = contextValues?.state.user.boxes.find(
      (box) => box.id === id
    );

    setFormikValues(formikValues as FormikValues);

    toggleEditModal();
  };

  const removeBox = async (id: string) => {
    try {
      const filteredBoxes = contextValues?.state.user.boxes.filter(
        (box) => box.id !== id
      );
      await deleteDocument(`${budgetCollection}/${id}`);
      contextValues?.dispatch(setBoxes(filteredBoxes));
      toast.success("usunięto");
    } catch (error) {
      toast.error("wystąpił błąd ;)");
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return {
    ...contextValues,
    toggleModal,
    isModalOpen,
    createNewBox,
    removeBox,
    boxes: contextValues?.state.user.boxes,
    updateBox,
    toggleEditModal,
    isEditModalOpen,
    formikValues,
    openEditModal,
  };
};
