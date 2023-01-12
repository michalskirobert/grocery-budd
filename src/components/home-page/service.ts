import { useContext, useState } from "react";
import { Context } from "@store/provider";
import { NProvider } from "@namespace/provider";
import { addDocument, deleteDocument, updateDocument } from "src/firebase";
import { toast } from "react-toastify";
import { FormikValues } from "formik";
import { setBoxes } from "@store/actions";
import { NReducer } from "@namespace/reducer";
import { generateRandomColor } from "@helpers/useful-functions";

import * as C from "@utils/constants";

export const useHomePageService = () => {
  const contextValues = useContext<NProvider.TContextApiProps | null>(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const budgetCollection = `users/${contextValues?.state.user?.uid}/budgets`;

  const [formikValues, setFormikValues] = useState<FormikValues>({});

  const createNewBox = async (values: FormikValues) => {
    if (!contextValues?.state.user?.uid) return;

    try {
      const request: Partial<NReducer.TBox> = {
        ...values,
        budget: values.budget,
        currency: values.currency,
        backgroundColor: !!values?.randomColor
          ? generateRandomColor()
          : values?.backgroundColor,
        color: !!values?.randomColor ? generateRandomColor() : values?.color,
        lastModifiedDate: new Date(),
        createdDate: new Date(),
        randomColor: false,
      };

      const resp = await addDocument(budgetCollection, request);

      const body = { ...request, id: resp.id };

      contextValues.dispatch(
        setBoxes([...contextValues.state.user.boxes, body] as NReducer.TBox[])
      );

      toggleModal();
      toast.success("It's been saved");
    } catch (error) {}
  };

  const updateBox = async (values: FormikValues) => {
    try {
      const box = contextValues?.state.user.boxes?.find(
        ({ id }) => id === values.id
      );

      const body = {
        ...box,
        ...values,
        backgroundColor: !!values?.randomColor
          ? generateRandomColor()
          : values?.backgroundColor,
        color: !!values?.randomColor ? generateRandomColor() : values?.color,
        lastModifiedDate: new Date(),
      } as NReducer.TBox;

      await updateDocument(`${budgetCollection}/${values.id}`, body);

      toast.success("Successfully edited", {
        style: { color: C.COLOR_BASE.SALMON, background: C.COLOR_BASE.YELLOW },
      });

      contextValues?.dispatch(
        setBoxes(
          contextValues.state.user.boxes
            .filter((box) => box.id !== values.id)
            .concat(body)
        )
      );
      toggleEditModal();
    } catch (error) {
      toast.error("It cannot be edited");
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
      contextValues?.dispatch(setBoxes(filteredBoxes as NReducer.TBox[]));
      toast.success("It's been removed");
    } catch (error) {
      toast.error("It cannot be removed");
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
