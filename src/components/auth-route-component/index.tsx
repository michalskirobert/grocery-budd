import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "src/firebase";
import { onAuthStateChanged } from "@firebase/auth";

export const AuthPage = ({ children }) => {
  const [checkingIsLogged, setCheckingIsLogged] = useState<boolean>(true);

  const navigate = useNavigate();

  const AuthCheck = () =>
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/sign-in");
        setCheckingIsLogged(false);
        return;
      } else {
        setCheckingIsLogged(false);
      }
    });

  useEffect(() => {
    AuthCheck();
  }, [auth]);

  if (checkingIsLogged) return <div>Loading....</div>;

  return <>{children}</>;
};
