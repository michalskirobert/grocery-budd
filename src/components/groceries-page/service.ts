import { useState, useContext, useEffect } from "react";

import { FormikValues } from "formik";

import { Context } from "@store/provider";
import { NProvider } from "@namespace/index";

import { addDocument, deleteDocument, getCollection } from "src/firebase";
import { toast } from "react-toastify";
import { useParams, Params } from "react-router";
import { addNewGrocery, deleteGrocery, setGroceries } from "@store/actions";
import { checkCurrency } from "@components/home-page/utils";

import * as C from "@utils/constants";
import { GROCERY_COLORS } from "./utils";

export const useGroceriesService = () => {
  const { boxId } = useParams<Params>();

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const groceryDbPath = `users/${props?.state.user?.uid}/budgets/${boxId}/groceries`;

  const currentBox = props?.state.user.boxes.find(({ id }) => id === boxId);

  const spentMoney = Number(
    (props?.state?.user?.groceries[String(boxId)] || []).reduce(
      (acc: number, curr) => {
        return acc + curr.calculatedValue;
      },
      0
    )
  );

  const leftBudget =
    Number(currentBox?.budget) -
    Number(
      (props?.state?.user?.groceries[String(boxId)] || []).reduce(
        (acc: number, curr) => {
          return acc + curr.calculatedValue;
        },
        0
      )
    );

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

  const addGrocery = async (values: FormikValues) => {
    if (!boxId) return;

    try {
      const body: FormikValues = {
        ...values,
        color:
          GROCERY_COLORS[Math.round(Math.random() * GROCERY_COLORS.length)],
        calculatedValue: values.value * values.pieces,
      };

      setIsLoading(true);
      const resp = await addDocument(groceryDbPath, body);

      props?.dispatch(
        addNewGrocery(
          {
            ...body,
            id: resp.id,
          },
          boxId
        )
      );
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

  const checkIsModalValid = (values: FormikValues) => {
    const currentBudget = leftBudget - values[C.VALUE];

    if (currentBudget < 0) {
      return {
        isBlocked: true,
        errorMessage: `Price cannot be over the budget, you still need ${checkCurrency(
          currentBox?.currency.value,
          values[C.VALUE] - leftBudget
        )}`,
      };
    }

    return { isBlocked: false, errorMessage: "" };
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
    spentMoney,
    leftBudget,
    currentBox,
    checkIsModalValid,
  };
};
