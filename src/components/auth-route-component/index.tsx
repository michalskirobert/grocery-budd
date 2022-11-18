import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "src/firebase";
import { onAuthStateChanged } from "@firebase/auth";

export const AuthPage = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/sign-in");
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    AuthCheck();
  }, [auth]);

  if (isLoading) return <div>Loading....</div>;

  return <>{children}</>;
};
