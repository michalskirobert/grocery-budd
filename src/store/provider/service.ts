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
  setIsLoading,
  setUser,
} from "@store/actions";

export const useProviderService = () => {
  const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(false);

  const [language, setLanguage] = useState<NProvider.TOptions>({
    label: "English",
    value: "eng",
  });

  const [state, dispatch] = useReducer<
    Reducer<NReducer.TState, NReducer.TAcion>
  >(reducer, initialState);

  const userDataPaths = {
    user: `users/${state?.user?.uid}`,
    budgets: `users/${state?.user?.uid}/budgets`,
    appConfig: `languages/${language.value}`,
  };

  const getInitApp = async () => {
    if (!state.user?.uid) return;

    let boxes: any[] = [];

    try {
      dispatch(setIsLoading(true));
      const userProperties = await getDocument(userDataPaths.user);
      const budgets = await getCollection(userDataPaths.budgets);
      const appConfig = await getDocument(userDataPaths.appConfig);

      budgets.docs.forEach(async (doc) =>
        boxes.push({ id: doc.id, ...doc.data(), groceries: [] })
      );

      dispatch(setUser(userProperties.data()));
      dispatch(setBoxes(boxes));
      dispatch(setConfigApp(appConfig.data()));
    } catch (error) {
      toast.error("error");
    }
    dispatch(setIsLoading(false));
  };

  const logout = async () => {
    try {
      dispatch(setIsLoading(true));
      await signOut(auth);
      dispatch(setInitialState());
    } catch (error) {
      toast.error("Nie można wylogować użytkownika");
    }

    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    getInitApp(); // eslint-disable-next-line
  }, [state.user.uid]);

  return {
    language,
    setLanguage,
    logout,
    isGlobalLoading,
    setIsGlobalLoading,
    dispatch,
    state,
  };
};
