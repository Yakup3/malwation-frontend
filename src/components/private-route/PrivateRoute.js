import React from "react";
import { Navigate } from "react-router-dom";

import { ROUTE_PATHS } from "../../App.routes";
import AppContainer from "../AppContainer/AppContainer";

const PrivateRoute = ({ component: Component, isAuthenticated }) => {
  return isAuthenticated ? (
    <AppContainer component={Component} />
  ) : (
    <Navigate to={ROUTE_PATHS.LOGIN} />
  );
};

export default PrivateRoute;
