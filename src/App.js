import React, { Suspense, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PrivateRoute from "./components/private-route/PrivateRoute";

import AuthService from "./auth/authService";
import { ROUTE_PATHS, APP_ROUTES } from "./shared.constants";

const App = () => {
  const [routes] = useState(APP_ROUTES);
  const isAuthenticated = AuthService.isAuthenticated();

  const renderAppRoutes = () => {
    return routes.map((route) => {
      const LazyComponent = route.component;
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<PrivateRoute component={<LazyComponent />} />}
        />
      );
    });
  };

  return (
    <Suspense fallback={<div>{"common.loading"}... </div>}>
      <Router>
        <div>
          <Routes>
            <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
            <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />} />
            {renderAppRoutes()}
            <Route
              path="/*"
              element={
                <Navigate
                  to={
                    isAuthenticated ? ROUTE_PATHS.USER_LIST : ROUTE_PATHS.LOGIN
                  }
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
