import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("email")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/api/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    console.log('logout called');
    await axios.post("/api/logout");
    console.log('axios route logout called');
    localStorage.removeItem("user");
    console.log('user removed');
    setCurrentUser(null);
    console.log('user set to null');
  };

  useEffect(() => {
    localStorage.setItem("email", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};