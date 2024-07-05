import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const res = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
        console.log("API Response:", res.data);
        if (res.data) {
          const isAdmin = res.data.id === 10;
          const userWithAdmin = { ...res.data, isAdmin };
          console.log("User with isAdmin:", userWithAdmin);
          setLoginUser(userWithAdmin);
          showMessage({ title: "ログインしました", status: "success" });
          history.push("/home");
        } else {
          showMessage({ title: "ユーザーが見つかりません", status: "error" });
        }
      } catch (error) {
        console.error("Login error:", error);
        showMessage({ title: "ログインできません", status: "error" });
      } finally {
        setLoading(false);
      }
    },
    [history, showMessage, setLoginUser]
  );

  return { login, loading };
};
