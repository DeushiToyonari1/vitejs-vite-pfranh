import { Dispatch, ReactNode, SetStateAction, createContext, useState, FC } from "react";
import { User } from "../types/api/user";

type LoginUserContextType = {
  loginUser: User | null;
  setLoginUser: Dispatch<SetStateAction<User | null>>;
};

export const LoginUserContext = createContext<LoginUserContextType>({} as LoginUserContextType);

export const LoginUserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loginUser, setLoginUser] = useState<User | null>(null);
  console.log("LoginUserProvider state:", { loginUser });
  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
