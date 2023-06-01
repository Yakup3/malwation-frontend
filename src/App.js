import React, { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PrivateRoute from "./components/private-route/PrivateRoute";

import APP_ROUTES, { ROUTE_PATHS } from "./App.routes";

const App = () => {
  const [routes] = useState(APP_ROUTES);
  const [isAuthenticated] = useState(true);

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
      <Routes>
        <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />} />
        {renderAppRoutes()}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
