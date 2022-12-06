import { useContext, useState } from "react";
import { Context } from "@store/provider";
import { NProvider } from "@namespace/provider";
import { addDocument, deleteDocument, updateDocument } from "src/firebase";
import { toast } from "react-toastify";
import { FormikValues } from "formik";
import { setBoxes } from "@store/actions";
import { NReducer } from "@namespace/reducer";

import * as C from "@utils/constants";
import { generateRandomColor } from "@helpers/useful-functions";

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
        randomColor: false,
        budget: values.budget,
        currency: values.currency,
        backgroundColor: !!values?.randomColor
          ? generateRandomColor()
          : values?.backgroundColor,
        color: !!values?.randomColor ? generateRandomColor() : values?.color,
        lastModifiedDate: new Date(),
        createdDate: new Date(),
      };

      const resp = await addDocument(budgetCollection, request);

      const body = { ...request, id: resp.id };

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

      const body = {
        ...box,
        ...values,
        lastModifiedDate: new Date(),
      } as NReducer.TBox;

      await updateDocument(`${budgetCollection}/${values.id}`, body);

      toast.success("Pomyślnie zedytowana", {
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
