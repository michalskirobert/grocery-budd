import { Reducer, useEffect, useReducer, useState } from "react";
import { NProvider } from "@namespace/index";
import { initialGroceryHelper } from "./utils";
import { auth, getCollection, getDocument } from "src/firebase";
import { signOut } from "firebase/auth";

import { toast } from "react-toastify";
import { initialState, reducer } from "@store/reducer";
import { NReducer } from "@namespace/reducer";
import {
  setBoxes,
  setConfigApp,
  setInitialState,
  setUser,
} from "@store/actions";

export const useProviderService = () => {
  const [groceries, setGroceries] =
    useState<Record<string, any>[]>(initialGroceryHelper);
  const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(false);

  const [language, setLanguage] = useState<NProvider.TOptions>({
    label: "English",
    value: "eng",
  });

  const [state, dispatch] = useReducer<Reducer<any, NReducer.TAcion>>(
    reducer,
    initialState
  );

  const userDataPaths = {
    user: `users/${state?.user?.uid}`,
    budgets: `users/${state?.user?.uid}/budgets`,
    appConfig: `languages/${language.value}`,
  };

  const getInitApp = async () => {
    if (!state.user?.uid) return;

    let boxes: any[] = [];

    try {
      const userProperties = await getDocument(userDataPaths.user);
      const budgets = await getCollection(userDataPaths.budgets);
      const appConfig = await getDocument(userDataPaths.appConfig);

      budgets.docs.forEach((doc) => boxes.push({ id: doc.id, ...doc.data() }));

      dispatch(setUser(userProperties.data()));
      dispatch(setBoxes(boxes));
      dispatch(setConfigApp(appConfig.data()));
    } catch (error) {
      toast.error("error");
    }
  };

  console.log({ state });

  const logout = async () => {
    try {
      setIsGlobalLoading(true);
      await signOut(auth);
      dispatch(setInitialState());
      setIsGlobalLoading(false);
    } catch (error) {
      setIsGlobalLoading(false);
      toast.error("Nie można wylogować użytkownika");
    }
  };

  useEffect(() => {
    getInitApp(); // eslint-disable-next-line
  }, [state]);

  return {
    groceries,
    setGroceries,
    language,
    setLanguage,
    logout,
    isGlobalLoading,
    setIsGlobalLoading,
    dispatch,
    state,
  };
};
