import { useState, useContext, useEffect } from "react";

import { FormikValues } from "formik";

import { Context } from "@store/provider";
import { NProvider, NReducer } from "@namespace/index";

import { addDocument, deleteDocument, getCollection } from "src/firebase";
import { toast } from "react-toastify";
import { useParams, Params } from "react-router";
import { addNewGrocery, deleteGrocery, setGroceries } from "@store/actions";
import { checkCurrency } from "@components/home-page/utils";
import { GROCERY_COLORS } from "./utils";
import { ChartData } from "chart.js";

import * as C from "@utils/constants";

export const useGroceriesService = () => {
  const { boxId } = useParams<Params>();

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const groceryDbPath = `users/${props?.state.user?.uid}/budgets/${boxId}/groceries`;

  const currentBox = props?.state.user.boxes.find(({ id }) => id === boxId);

  const spentMoney = Number(
    (props?.state?.user?.groceries[String(boxId)] || []).reduce(
      (acc: number, curr) => {
        return acc + curr.value * curr.pieces;
      },
      0
    )
  );

  const leftBudget =
    Number(currentBox?.budget) -
    Number(
      (props?.state?.user?.groceries[String(boxId)] || []).reduce(
        (acc: number, curr) => {
          return acc + curr.value * curr.pieces;
        },
        0
      )
    );

  const toggleFormModal = () => setIsModalOpen(!isModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const getGroceries = async () => {
    if (!boxId) return;

    try {
      setIsLoading(true);
      const resp = await getCollection(groceryDbPath);
      props?.dispatch(
        setGroceries(
          resp.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as NReducer.TGrocery[],
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
      const body: NReducer.TGrocery = {
        ...(values as NReducer.TGrocery),
        color:
          GROCERY_COLORS[Math.round(Math.random() * GROCERY_COLORS.length - 1)],
        lastModifiedDate: new Date().toLocaleDateString(),
        createdDate: new Date().toLocaleDateString(),
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
    const currentBudget = leftBudget - values[C.VALUE] * values[C.PIECES];

    if (currentBudget < 0) {
      return {
        isBlocked: true,
        errorMessage: `Price cannot be over the budget, you still need ${checkCurrency(
          currentBox?.currency?.value,
          values[C.VALUE] - leftBudget
        )}`,
      };
    }

    return { isBlocked: false, errorMessage: "" };
  };

  const parseGroceryData = () => {
    const groceries = props?.state.user.groceries[String(boxId)];
    const shopes = props?.state.configApp.shops.map(
      ({ label }) => label
    ) as string[];

    const dates = Array.from(
      new Set(groceries?.map((item) => item.createdDate)).values()
    );

    let shopesBudget: number[] = [];

    shopes?.forEach((el) => {
      const sources = groceries
        ?.filter(({ shopName }) => shopName.label === el)
        .reduce((acc, curr) => acc + curr.calculatedValue, 0) as number;

      shopesBudget.push(sources);
    });

    let dateBudgets: number[] = [];

    dates?.forEach((el) => {
      const sources = groceries
        ?.filter(({ createdDate }) => createdDate === el)
        .reduce((acc, curr) => acc + curr.calculatedValue, 0) as number;

      dateBudgets.push(sources);
    });

    const { BLACK, BLUE, GREY, ORNAGE, PINK, SALMON, YELLOW } = C.COLOR_BASE;

    const colors = [YELLOW, BLACK, BLUE, GREY, ORNAGE, PINK, SALMON];

    const data: ChartData<"pie", number[], string> = {
      labels: dates,
      datasets: [
        {
          type: "pie",
          label: "Date expenses",
          data: dateBudgets || [],
          backgroundColor: colors,
          hoverOffset: 4,
          parsing: {
            xAxisKey: "key",
            yAxisKey: "value",
          },
        },
        {
          type: "pie",
          label: "xxx",
          data: shopesBudget || [],
          backgroundColor: colors,
          hoverOffset: 4,
          parsing: {
            yAxisKey: "gm",
          },
        },
      ],
    };

    return data;
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
    parseGroceryData,
    isEditModalOpen,
    toggleEditModal,
  };
};
