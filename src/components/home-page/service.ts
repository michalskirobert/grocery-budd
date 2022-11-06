import { useContext, useState } from "react";
import { Context } from "@store/provider";

import * as C from "@utils/constants";

export const useHomePageService = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [boxes, setBoxes] = useState<any[]>([]);

  const createNewBox = ({ ...props }) =>
    setBoxes((prev) => [
      ...prev,
      {
        ...props,
        id: Math.random(),
        budgetValue: `${props[C.CURRENCY]?.value}${props.budget}`,
      },
    ]);

  const removeBox = (id: string) =>
    setBoxes((prev) => prev.filter((box) => box.id !== id));

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const props = useContext(Context);

  return { ...props, toggleModal, isModalOpen, createNewBox, removeBox, boxes };
};
