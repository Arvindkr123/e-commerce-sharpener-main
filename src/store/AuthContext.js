import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState("");

  const userLoggedIn = !!token;
  const loginHandler = (token, email) => {
    // console.log(email);
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    setEmail("");
    localStorage.removeItem("token");
  };

  const contextValue = {
    email: email,
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
