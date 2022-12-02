import { NProvider } from "@namespace/provider";
import { setLanguage } from "@store/actions";
import { Context } from "@store/provider";
import { useContext } from "react";
import { toast } from "react-toastify";
import { updateDocument } from "src/firebase";

export const useHeaderService = () => {
  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const { state, dispatch } = props || {};

  const changeLanguage = async (language: NProvider.TOptions) => {
    if (!state?.user?.uid) {
      dispatch && dispatch(setLanguage(language));
      return;
    }

    try {
      await updateDocument(`users/${state?.user.uid}`, { language });
      dispatch && dispatch(setLanguage(language));
    } catch (error) {
      toast.error("Cannot change the language");
    }
  };

  return { ...state, changeLanguage };
};
