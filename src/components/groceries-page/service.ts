import { useState, useContext, useEffect } from "react";

import { FormikValues } from "formik";

import { Context } from "@store/provider";
import { NProvider, NReducer } from "@namespace/index";

import {
  addDocument,
  deleteDocument,
  getCollection,
  updateDocument,
} from "src/firebase";
import { toast } from "react-toastify";
import { useParams, Params } from "react-router";
import {
  addNewGrocery,
  deleteGrocery,
  editGrocery,
  setGroceries,
} from "@store/actions";
import { checkCurrency } from "@components/home-page/utils";
import { FILTERS_HELPER, GROCERY_COLORS } from "./utils";
import { ChartData } from "chart.js";

import * as C from "@utils/constants";

export const useGroceriesService = () => {
  const { boxId } = useParams<Params>();

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [formikValues, setFormikValues] = useState<FormikValues>({});
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);
  const [groceriesList, setGroceriesList] = useState<
    NReducer.TGrocery[] | undefined
  >([]);

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
  const toggleFiltersModal = () => setIsFiltersModalOpen(!isFiltersModalOpen);

  const onFilters = ({ key, search }: { key: string; search: string }) => {
    const foundItems = props?.state?.user.groceries[String(boxId)]?.filter(
      (item) =>
        item[key].toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    setGroceriesList(foundItems);

    toggleFiltersModal();
  };

  const onSorting = (sorting: string) => {
    const sortedGroceries = props?.state?.user.groceries[String(boxId)]?.sort(
      (a, b) => {
        if (sorting === "date") {
          return (
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
          );
        } else if (sorting === "price") {
          return a.calculatedValue - b.calculatedValue;
        } else if (sorting === "pin") {
          return !a?.isPinned ? 1 : -1;
        } else {
          return a[sorting].localeCompare(b[sorting]);
        }
      }
    );

    setGroceriesList(sortedGroceries);
  };

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
    const leftMoney =
      Number(currentBox?.budget) -
      Number(
        (props?.state?.user?.groceries[String(boxId)] || [])
          .filter(({ id }) => id !== formikValues?.id)
          .reduce((acc: number, curr) => {
            return acc + curr.value * curr.pieces;
          }, 0)
      );

    const currentBudget = leftMoney - values[C.VALUE] * values[C.PIECES];

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

  const parseGroceryData = (key?: string) => {
    const groceries = props?.state.user.groceries[String(boxId)];

    const dates = Array.from(
      new Set(groceries?.map((item) => item.createdDate)).values()
    );

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
      ],
    };

    return data;
  };

  const openEditModal = (id: string) => {
    setFormikValues({});

    const formikValues = props?.state?.user?.groceries[String(boxId)].find(
      (grocery) => grocery.id === id
    );

    setFormikValues(formikValues as FormikValues);

    toggleEditModal();
  };

  const editCurrentGrocery = async (body: FormikValues) => {
    try {
      setIsLoading(true);
      await updateDocument(`${groceryDbPath}/${body.id}`, body);
      toggleEditModal();

      const request = {
        ...(body as NReducer.TGrocery),
        calculatedValue: body.value * body.pieces,
      };

      props?.dispatch(editGrocery(request, boxId));

      toast.success(`Grocery ${body.name} has been updated`);
    } catch (error) {
      toast.error("We can't update this grocery");
    }

    setIsLoading(false);
  };

  const handleButtons = (action: string) => {
    switch (action) {
      case FILTERS_HELPER.SEARCH:
        toggleFiltersModal();
        break;
      default:
        onSorting(action);
        break;
    }
  };

  useEffect(() => {
    getGroceries();
  }, [boxId]);

  console.log({ groceriesList });

  useEffect(() => {
    setGroceriesList(props?.state?.user.groceries[String(boxId)]);
  }, [props?.state?.user.groceries[String(boxId)]]);

  return {
    ...props,
    removeGrocery,
    addGrocery,
    toggleFormModal,
    isModalOpen,
    isLoading,
    spentMoney,
    leftBudget,
    currentBox,
    checkIsModalValid,
    parseGroceryData,
    isEditModalOpen,
    toggleEditModal,
    openEditModal,
    formikValues,
    editCurrentGrocery,
    toggleFiltersModal,
    isFiltersModalOpen,
    groceriesList,
    setGroceriesList,
    handleButtons,
    onFilters,
  };
};
