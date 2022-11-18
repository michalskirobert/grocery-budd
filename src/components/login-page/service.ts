import { useState } from "react";
import { string } from "yup";

interface ISignInData {
  email: string;
  password: string;
}

export const useLoginService = () => {
  const signIn = ({ email, password }: ISignInData) => {};

  return { signIn };
};
