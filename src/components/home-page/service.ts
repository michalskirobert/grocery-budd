import { useContext, useEffect, useState } from "react";
import { Context } from "@store/provider";

import * as C from "@utils/constants";
import { NProvider } from "@namespace/provider";
import { addDocument, getCollection, setDocument } from "src/firebase";

export const useHomePageService = () => {
  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [boxes, setBoxes] = useState<any[]>([]);

  const createNewBox = async ({ ...props }) => {
    try {
      const body = {
        boxes: [
          ...boxes,
          {
            ...props,
            test: true,
            id: Math.random(),
            budgetValue: `${props[C.CURRENCY]?.value}${props.budget}`,
            budget: props.budget,
            currency: props.currency,
          },
        ],
      };

      await setDocument("L8IwAOJlp9ad2rQ7FVf0vtoM6lG3/budget", body);

      setBoxes((prev) => [...prev, body]);
    } catch (error) {}
  };

  const removeBox = (id: string) => {
    setBoxes((prev) => prev.filter((box) => box.id !== id));
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    setBoxes(props?.userData?.boxes);
  }, [props?.userData?.boxes]);

  return { ...props, toggleModal, isModalOpen, createNewBox, removeBox, boxes };
};
