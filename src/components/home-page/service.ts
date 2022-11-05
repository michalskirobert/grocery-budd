import { useContext, useEffect } from "react";
import { Context } from "src/store/provider";

export const useHomePageService = () => {
  const props = useContext(Context);

  return { ...props };
};
