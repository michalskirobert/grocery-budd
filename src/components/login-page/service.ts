import { NProvider } from "@namespace/provider";
import { Context } from "@store/provider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "src/firebase";

import { toast } from "react-toastify";
import { setIsLoading, setUser } from "@store/actions";

interface ISignInData {
  email: string;
  password: string;
}

export const useLoginService = () => {
  const navigate = useNavigate();

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const signIn = async ({ email, password }: ISignInData) => {
    try {
      props?.dispatch(setIsLoading(true));
      const resp = await signInWithEmailAndPassword(auth, email, password);
      props?.dispatch(setUser(resp.user));
      props?.dispatch(setIsLoading(false));
      navigate("/");
      toast.success(`Hello ${resp?.user?.email} :)`);
    } catch (error) {
      props?.dispatch(setIsLoading(false));
      toast.error("Password or email is incorrect");
    }
  };

  useEffect(() => {
    props?.logout(); // eslint-disable-next-line
  }, []);

  return { signIn };
};
