import { useState } from "react";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "src/firebase";
import { toast } from "react-toastify";
import { useCreateValidations } from "@helpers/use-hooks";
import { FOROGOT_PASSWORD_FORM } from "./utils";

export const useForgotPasswordService = () => {
  const { validationSchema } = useCreateValidations({
    form: FOROGOT_PASSWORD_FORM,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changePassword = async (email: string) => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      toast.error("We can't change the password");
    }

    setIsLoading(false);
  };

  return { changePassword, isLoading, validationSchema };
};
