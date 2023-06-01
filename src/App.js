import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PrivateRoute from "./components/private-route/PrivateRoute";

import { AppContextProvider } from "./AppContext";
import { ROUTE_PATHS, APP_ROUTES, LOCAL_STORAGE } from "./shared.constants";

const App = () => {
  const [routes] = useState(APP_ROUTES);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    setIsAuthenticated(!!token);
  }, []);

  const renderAppRoutes = () => {
    return routes.map((route) => {
      const LazyComponent = route.component;
      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PrivateRoute
              component={<LazyComponent />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      );
    });
  };

  return (
    <Suspense fallback={<div>{"common.loading"}... </div>}>
      <AppContextProvider routes={routes}>
        <Routes>
          <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />} />
          {renderAppRoutes()}
          <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} />} />
        </Routes>
      </AppContextProvider>
    </Suspense>
  );
};

export default App;
