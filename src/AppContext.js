import React, { createContext } from "react";

export const AppContext = createContext({
  routes: [],
});

export const AppContextProvider = ({ children, routes }) => {
  return (
    <AppContext.Provider value={{ routes }}>{children}</AppContext.Provider>
  );
};
