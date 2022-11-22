import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "src/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { Context } from "@store/provider";
import { NProvider } from "@namespace/provider";
import { useLocation } from "react-router";

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
      props?.setUser(user);
      setCheckingIsLogged(false);
    });

  useEffect(() => {
    AuthCheck(); // eslint-disable-next-line
  }, [auth]);

  if (checkingIsLogged) return <div>Loading....</div>;

  return <>{children}</>;
};
