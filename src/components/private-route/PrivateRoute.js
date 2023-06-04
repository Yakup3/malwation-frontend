import React from "react";
import { Navigate } from "react-router-dom";

import { ROUTE_PATHS } from "../../shared.constants";
import AppContainer from "../AppContainer/AppContainer";
import AuthService from "../../auth/authService";

const PrivateRoute = ({ component }) => {
  const isAuthenticated = AuthService.isAuthenticated();

  return isAuthenticated ? (
    <AppContainer component={component} />
  ) : (
    <Navigate to={ROUTE_PATHS.LOGIN} />
  );
};

export default PrivateRoute;
