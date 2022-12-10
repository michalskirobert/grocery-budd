import { NProvider } from "@namespace/provider";
import { Context } from "@store/provider";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { addDocument, auth } from "src/firebase";

import { toast } from "react-toastify";
import { setIsLoading, setUser } from "@store/actions";
import { NReducer } from "@namespace/reducer";
import { initialState } from "@store/reducer";

interface ISignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

const createDataBase = async (userId: string) => {
  try {
    const body = {
      userType: 0,
    };

    await addDocument(userId, body);
  } catch (error) {
    toast.error("User cannot be created");
  }
};

export const useSignUpService = () => {
  const navigate = useNavigate();

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const signUp = async ({ email, password, confirmPassword }: ISignUpData) => {
    if (password !== confirmPassword) {
      toast.error("Passwords needs to be same!");
      return;
    }

    try {
      props?.dispatch(setIsLoading(true));
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      await createDataBase(resp.user.uid);

      const body = { ...initialState["user"], ...resp.user };

      navigate("/");
      props?.dispatch(setUser(body as NReducer.TUser));
      props?.dispatch(setIsLoading(false));
      toast.success(`Hello ${resp?.user?.email} :)`);
    } catch (error) {
      props?.dispatch(setIsLoading(false));
      toast.error("Cannot create a new user");
    }
  };

  useEffect(() => {
    props?.logout(); // eslint-disable-next-line
  }, []);

  return { signUp };
};
