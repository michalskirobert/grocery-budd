import { useContext, useState } from "react";
import { Context } from "@store/provider";

import * as C from "@utils/constants";
import { NProvider } from "@namespace/provider";

export const useHomePageService = () => {
  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [boxes, setBoxes] = useState<any[]>(props?.userData?.budgets || []);

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

  return { ...props, toggleModal, isModalOpen, createNewBox, removeBox, boxes };
};
