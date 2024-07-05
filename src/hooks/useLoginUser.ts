import { useContext } from "react";
import { LoginUserContext } from "../providers/LoginUserProvider";

export const useLoginUser = () => {
  const context = useContext(LoginUserContext);
  if (!context) {
    throw new Error("useLoginUser must be used within a LoginUserProvider");
  }
  console.log("useLoginUser context:", context);
  return context;
};
