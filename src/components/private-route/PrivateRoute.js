import React from "react";
import { Navigate } from "react-router-dom";

import { ROUTE_PATHS } from "../../shared.constants";
import AppContainer from "../AppContainer/AppContainer";

const PrivateRoute = ({ component, isAuthenticated }) => {
  return isAuthenticated ? (
    <AppContainer component={component} />
  ) : (
    <Navigate to={ROUTE_PATHS.LOGIN} />
  );
};

export default PrivateRoute;
