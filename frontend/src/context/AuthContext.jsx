import { createContext, useContext, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("lumora_token"));

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("lumora_token", data.accessToken);
    setToken(data.accessToken);
  };

  const logout = () => {
    localStorage.removeItem("lumora_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthed: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}