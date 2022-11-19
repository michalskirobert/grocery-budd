import { NProvider } from "@namespace/provider";
import { Context } from "@store/provider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "src/firebase";

import { toast } from "react-toastify";

interface ISignInData {
  email: string;
  password: string;
}

export const useLoginService = () => {
  const navigate = useNavigate();

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const signIn = async ({ email, password }: ISignInData) => {
    try {
      props?.setIsGlobalLoading(true);
      const resp = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      props?.setUserData(resp.user);
      props?.setIsGlobalLoading(false);
      toast.success(`Hello ${resp?.user?.email} :)`);
    } catch (error) {
      props?.setIsGlobalLoading(false);
      toast.error("Password or email is incorrect");
    }
  };

  useEffect(() => {
    props?.logout();
  }, []);

  return { signIn };
};
