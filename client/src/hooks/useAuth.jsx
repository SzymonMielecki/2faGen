import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      user,
      login: async (data) => {
        setUser(data);
        navigate("/");
      },
      logout: () => {
        setUser(null);
        navigate("/login", { replace: true });
      },
    }),
    [user, setUser, navigate],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
