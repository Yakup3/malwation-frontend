import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import PrivateRoute from "./components/private-route/PrivateRoute";

import APP_ROUTES from "./App.routes";

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
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {renderAppRoutes()}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
