import { NProvider } from "@namespace/provider";
import { Context } from "@store/provider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { auth } from "src/firebase";

interface ISignInData {
  email: string;
  password: string;
}

export const useLoginService = () => {
  const navigate = useNavigate();

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const signIn = async ({ email, password }: ISignInData) => {
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      props?.setUserData(resp.user);
      navigate("/");
    } catch (error) {
      alert("WRONG KURWA");
    }
  };

  return { signIn };
};
