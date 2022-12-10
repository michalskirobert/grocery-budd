import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "src/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { Context } from "@store/provider";
import { NProvider } from "@namespace/provider";
import { useLocation } from "react-router";
import { setUser } from "@store/actions";
import { initialState } from "@store/reducer";
import { NReducer } from "@namespace/reducer";

export const AuthPage = ({ children }) => {
  const [checkingIsLogged, setCheckingIsLogged] = useState<boolean>(true);

  const props = useContext<NProvider.TContextApiProps | null>(Context);

  const navigate = useNavigate();
  const location = useLocation();

  const AuthCheck = () =>
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        if (location.pathname.includes("sign-up")) {
          setCheckingIsLogged(false);
          return;
        }

        navigate("/sign-in");
        setCheckingIsLogged(false);
        return;
      }

      const body = { ...initialState["user"], ...user };

      props?.dispatch(setUser(body as NReducer.TUser));
      setCheckingIsLogged(false);
    });

  useEffect(() => {
    AuthCheck(); // eslint-disable-next-line
  }, [auth]);

  if (checkingIsLogged) return <div>Loading....</div>;

  return <>{children}</>;
};
