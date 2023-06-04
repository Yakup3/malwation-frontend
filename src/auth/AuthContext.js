import React, { createContext, useState } from "react";
import AuthService from "./authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );

  const login = async (email, password) => {
    try {
      const token = await AuthService.login(email, password);
      setIsAuthenticated(true);
      return token;
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email, password) => {
    try {
      const response = await AuthService.register(email, password);

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
